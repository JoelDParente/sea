"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Divider, IconButton, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import CabecalhoProva from './cabecalho-prova';
import ModalCriarQuestao from './modal-criar-questao';

interface FolhaA4Props {
  questoes: any[]; // each question object: { titulo?, enunciado: string (html), alternativas?: [] }
  onSlotClick?: (index: number) => void;
  onChangeQuestao?: (index: number, conteudo: string) => void;
  onRemoveQuestao?: (index: number) => void;
  metadata: {
    titulo: string;
    disciplina: string;
    avaliacao?: string;
    professor?: string;
  };
  twoColumns?: boolean; // option to split sheet in two columns
}

const pxA4Width = 794;
const pxA4Height = 1122;

const FolhaA4: React.FC<FolhaA4Props> = ({ questoes, onSlotClick = () => {}, metadata, twoColumns = true, onChangeQuestao, onRemoveQuestao }) => {
  // Layout constants (px)
  const paddingPx = 32;
  const columnGapPx = 32;
  const columnsPerPage = twoColumns ? 2 : 1;

  const columnInnerWidth = (pxA4Width - paddingPx * 2 - (columnsPerPage - 1) * columnGapPx) / columnsPerPage;

  const measurerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const [pages, setPages] = useState<number[][][] | null>(null); // pages -> columns -> fragment indexes
  const [fragments, setFragments] = useState<any[] | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const waitForImages = (el: HTMLElement | null) => {
    if (!el) return Promise.resolve();
    const imgs = Array.from(el.querySelectorAll('img')) as HTMLImageElement[];
    return Promise.all(
      imgs.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((res) => {
          img.addEventListener('load', res);
          img.addEventListener('error', res);
        });
      })
    );
  };

  const measureHtmlHeight = async (html: string) => {
    if (!measurerRef.current) return 0;
    const temp = document.createElement('div');
    temp.style.width = `${columnInnerWidth}px`;
    temp.style.position = 'relative';
    temp.style.visibility = 'hidden';
    temp.innerHTML = html;
    measurerRef.current.appendChild(temp);
    await waitForImages(temp);
    const h = temp.offsetHeight;
    measurerRef.current.removeChild(temp);
    return h;
  };

  useEffect(() => {
    console.log('FolhaA4 render - questoes count =', questoes?.length);
    let cancelled = false;

    const measureAndPaginate = async () => {
      if (!measurerRef.current) return;
      await waitForImages(measurerRef.current);
      const headerH = headerRef.current ? headerRef.current.offsetHeight : 60;
      const contentAreaHeight = pxA4Height - paddingPx * 2 - headerH - 24;

      const questionEls = Array.from(measurerRef.current.querySelectorAll('[data-measure-index]')) as HTMLElement[];

      const frags: any[] = [];
      const heights: number[] = [];

      for (let q = 0; q < questionEls.length; q++) {
        const el = questionEls[q];
        const totalH = el.offsetHeight + 6;

        if (totalH <= contentAreaHeight) {
          const children = Array.from(el.children) as HTMLElement[];
          const contentChildren = children.length > 0 && children[0].textContent?.trim().startsWith('Questão') ? children.slice(1) : children;
          const html = contentChildren.map((c) => c.outerHTML).join('');
          frags.push({ qid: q, html, isFirst: true, isLast: true });
          heights.push(totalH);
          continue;
        }

        // needs splitting by direct children
        const children = Array.from(el.children) as HTMLElement[];
        const hasTitleChild = children.length > 0 && children[0].textContent?.trim().startsWith('Questão');
        const titleHeight = hasTitleChild ? children[0].offsetHeight + 4 : 0;
        const contentChildren = hasTitleChild ? children.slice(1) : children;

        // Build child infos
        let childInfos: { html: string; h: number; el: HTMLElement }[] = [];
        for (const ch of contentChildren) {
          childInfos.push({ html: ch.outerHTML, h: ch.offsetHeight + 2, el: ch });
        }

        // Split single children that exceed column height if textual
        for (let ci = 0; ci < childInfos.length; ci++) {
          const info = childInfos[ci];
          if (info.h > contentAreaHeight) {
            const tag = info.el.tagName.toLowerCase();
            if (tag === 'p' || tag === 'div' || tag === 'li') {
              const text = info.el.textContent || '';
              const words = text.split(/(\s+)/);
              const parts: string[] = [];
              let curWords: string[] = [];

              for (let w = 0; w < words.length; w++) {
                curWords.push(words[w]);
                // test periodically or at end
                if (w % 12 === 0 || w === words.length - 1) {
                  const testHtml = `<p>${curWords.join('')}</p>`;
                  // eslint-disable-next-line no-await-in-loop
                  const hTest = await measureHtmlHeight(testHtml);
                  if (hTest <= contentAreaHeight) {
                    continue;
                  } else {
                    // remove last chunk to make it fit
                    // find largest prefix that fits
                    let hi = curWords.length - 1;
                    while (hi > 0) {
                      const candidate = `<p>${curWords.slice(0, hi).join('')}</p>`;
                      // eslint-disable-next-line no-await-in-loop
                      const hCand = await measureHtmlHeight(candidate);
                      if (hCand <= contentAreaHeight) {
                        parts.push(curWords.slice(0, hi).join(''));
                        // remaining words become new curWords
                        const remaining = curWords.slice(hi).concat(words.slice(w + 1));
                        curWords = remaining.slice(0);
                        // rebase outer loop index over remaining words
                        w = -1;
                        break;
                      }
                      hi -= 1;
                    }
                    if (hi <= 0) {
                      // cannot split into fitting chunk (very long word or media), keep as single part to avoid infinite loop
                      parts.push(curWords.join(''));
                      curWords = [];
                    }
                  }
                }
              }
              if (curWords.join('').trim()) parts.push(curWords.join(''));

              // replace current child with parts
              const newInfos: { html: string; h: number; el: HTMLElement }[] = [];
              for (const p of parts) {
                const html = `<p>${p}</p>`;
                // eslint-disable-next-line no-await-in-loop
                const hPart = await measureHtmlHeight(html);
                const fake = document.createElement('div');
                fake.innerHTML = html;
                newInfos.push({ html, h: hPart + 2, el: fake });
              }
              childInfos.splice(ci, 1, ...newInfos);
              ci += newInfos.length - 1;
            } else {
              // image/table etc: leave as is
            }
          }
        }

        // group children into fragments
        let curHtmlParts: string[] = [];
        let curH = 0;
        let partIndex = 0;
        for (let ci = 0; ci < childInfos.length; ci++) {
          const { html, h } = childInfos[ci];
          if (curH + h <= contentAreaHeight || curH === 0) {
            curHtmlParts.push(html);
            curH += h;
          } else {
            const fragH = curH + (partIndex === 0 ? titleHeight : 0);
            frags.push({ qid: q, html: curHtmlParts.join(''), isFirst: partIndex === 0, isLast: false });
            heights.push(fragH);
            partIndex += 1;
            curHtmlParts = [html];
            curH = h;
          }
        }
        if (curHtmlParts.length > 0) {
          const fragH = curH + (partIndex === 0 ? titleHeight : 0);
          frags.push({ qid: q, html: curHtmlParts.join(''), isFirst: partIndex === 0, isLast: true });
          heights.push(fragH);
        }
      }

      if (cancelled) return;
      setFragments(frags);

      // paginate fragments: greedy fill columns and pages
      const pagesArr: number[][][] = [];
      let currentPageCols: number[][] = Array.from({ length: columnsPerPage }, () => []);
      let currentColHeights = Array(columnsPerPage).fill(0);
      let colIndex = 0;

      for (let i = 0; i < heights.length; i++) {
        const h = heights[i];
        if (currentColHeights[colIndex] + h <= contentAreaHeight || currentColHeights[colIndex] === 0) {
          currentPageCols[colIndex].push(i);
          currentColHeights[colIndex] += h;
        } else {
          colIndex += 1;
          if (colIndex >= columnsPerPage) {
            pagesArr.push(currentPageCols);
            currentPageCols = Array.from({ length: columnsPerPage }, () => []);
            currentColHeights = Array(columnsPerPage).fill(0);
            colIndex = 0;
          }
          currentPageCols[colIndex].push(i);
          currentColHeights[colIndex] += h;
        }
      }

      if (currentPageCols.some((col) => col.length > 0)) pagesArr.push(currentPageCols);

      if (!cancelled) setPages(pagesArr);
    };

    const id = setTimeout(() => measureAndPaginate(), 50);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [questoes, twoColumns]);

  if (!pages || !fragments) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <div ref={measurerRef} style={{ position: 'absolute', left: -9999, top: 0, width: columnInnerWidth }}>
          <div ref={headerRef}>
            <CabecalhoProva titulo={metadata.titulo || ' '} disciplina={metadata.disciplina || ' '} avaliacao={metadata.avaliacao || ''} professor={metadata.professor || ''} />
            <Divider />
          </div>
          {questoes.map((q, idx) => (
            <div key={idx} data-measure-index={idx} style={{ display: 'block', marginBottom: 6, fontSize: '0.78rem', lineHeight: 1.3 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Questão {idx + 1}</div>
              <div dangerouslySetInnerHTML={{ __html: q?.enunciado ?? '' }} />
              <div>
                {(q?.alternativas ?? []).map((a: any, i: number) => (
                  <div key={i} style={{ fontSize: 10, marginTop: 2 }}>{String.fromCharCode(65 + i)}) {a.texto}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Calculando paginação para impressão...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      {pages.map((pageCols, pageIndex) => (
        <Box
          key={pageIndex}
          sx={{
            width: pxA4Width,
            height: pxA4Height,
            mx: 'auto',
            mb: 6,
            p: 4,
            border: '1px solid #ccc',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            overflow: 'hidden',
            position: 'relative',
            pageBreakAfter: 'always',
          }}
        >
          {pageIndex === 0 ? (
            <CabecalhoProva titulo={metadata.titulo || ' '} disciplina={metadata.disciplina || ' '} avaliacao={metadata.avaliacao || ''} professor={metadata.professor || ''} />
          ) : (
            <Typography variant="caption" align="right" mb={0}>Página {pageIndex + 1}</Typography>
          )}

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', gap: `${columnGapPx}px`, width: '100%', height: '100%' }}>
            {pageCols.map((colIndexes, colIdx) => (
              <Box key={colIdx} sx={{ width: columnInnerWidth, overflow: 'hidden' }}>
                {colIndexes.map((fragIdx) => {
                  const frag = fragments ? fragments[fragIdx] : null;
                  if (!frag) return null;
                  const original = questoes[frag.qid];
                  const displayQuestao = {
                    titulo: original?.titulo,
                    enunciado: frag.html,
                    alternativas: frag.isLast ? original?.alternativas ?? [] : [],
                  };
                  return (
                    <Box key={fragIdx} sx={{ mb: 1.5, fontSize: '0.78rem', lineHeight: 1.3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {frag.isFirst ? (
                          <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5, fontSize: '0.85rem' }}>Questão {frag.qid + 1}</Typography>
                        ) : (
                          <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5, fontSize: '0.85rem', fontStyle: 'italic' }}>Questão {frag.qid + 1} (continua)</Typography>
                        )}

                        <Box>
                          <Button size="small" onClick={() => { setEditIndex(frag.qid); setModalOpen(true); }} sx={{ mr: 1 }}>Editar</Button>
                          <IconButton size="small" color="error" onClick={() => onRemoveQuestao && onRemoveQuestao(frag.qid)}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>

                      <div dangerouslySetInnerHTML={{ __html: displayQuestao.enunciado }} />
                      {displayQuestao.alternativas.length > 0 && (
                        <Box sx={{ mt: 0.5 }}>
                          {displayQuestao.alternativas.map((a: any, i: number) => (
                            <div key={i} style={{ fontSize: 10, marginTop: 2 }}>{String.fromCharCode(65 + i)}) {a.texto}</div>
                          ))}
                        </Box>
                      )}

                      {/* Modal to edit whole question (even when viewing a fragment) */}
                      <ModalCriarQuestao
                        open={modalOpen && editIndex === frag.qid}
                        onClose={() => setModalOpen(false)}
                        onSave={(q: any) => {
                          const html = `<p>${String(q.enunciado || '')}</p>`;
                          if (onChangeQuestao) onChangeQuestao(frag.qid, html);
                          setModalOpen(false);
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FolhaA4;