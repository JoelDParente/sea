import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'; 

export interface CalendarioProps {
  width?: string | number;
  height?: string | number;
}

export function Calendario({ width = "100%", height = 420 }: CalendarioProps) {
  const [mesAtual, setMesAtual] = React.useState(dayjs());

  const meses = [
    mesAtual.subtract(1, "month"),
    mesAtual,
    mesAtual.add(1, "month"),
  ];

  const mesAnterior = () => {
    setMesAtual((prev) => prev.subtract(1, "month"));
  };

  const mesSeguinte = () => {
    setMesAtual((prev) => prev.add(1, "month"));
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        height: '100%',
        borderRadius: "18px",
        border: "1px solid rgba(0,0,0,0.06)",
        background: "var(--mui-palette-background-paper)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
        transition: "all .25s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          borderColor: "rgba(0,0,0,0.12)",
          transform: "translateY(-3px)",
        }
      }}
    >
      {/* Cabeçalho */}
      <Stack spacing={1} sx={{ mb: 1 }}>
        <Typography variant="h5" fontWeight={600}>
          Calendário
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Visualize datas importantes e navegue entre meses.
        </Typography>
      </Stack>

      {/* Área principal */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Botão esquerda */}
        <IconButton
          onClick={mesAnterior}
          sx={{
            position: "absolute",
            left: -10,
            zIndex: 10,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(6px)",
            "&:hover": { background: "rgba(255,255,255,0.9)" },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        {/* Carrossel */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            overflow: "hidden",
          }}
        >
          {meses.map((mes, index) => {
            const isCentral = index === 1;

            return (
              <Card
                key={index}
                sx={{
                  flexShrink: 0,
                  width: isCentral ? "60%" : "30%",
                  height: "90%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: isCentral ? 1 : 0.35,
                  transform: isCentral ? "scale(1)" : "scale(0.85)",
                  transition: "all 0.3s ease",
                  pointerEvents: "none", // <-- impede cliques
                  overflow: "hidden",
                  backdropFilter: "blur(4px)",
                  boxShadow: isCentral
                    ? "0px 4px 16px rgba(0,0,0,0.10)"
                    : "0px 2px 8px rgba(0,0,0,0.05)",
                  
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                  <DateCalendar
                    value={mes}
                    readOnly
                    sx={{
                      "& .MuiDayCalendar-header": {
                        opacity: isCentral ? 1 : 0.6,
                      },
                      "& .MuiPickersSlideTransition-root": {
                        overflow: "hidden",
                      },
                      "& .MuiPickersDay-root": {
                        fontSize: isCentral ? "1rem" : "0.75rem",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Card>
            );
          })}
        </Box>

        {/* Botão direita */}
        <IconButton
          onClick={mesSeguinte}
          sx={{
            position: "absolute",
            right: -10,
            zIndex: 10,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(6px)",
            "&:hover": { background: "rgba(255,255,255,0.9)" },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
}