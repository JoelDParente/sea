// app/page.tsx
'use client';

import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import {
  Speed as SpeedIcon,
  FolderOpen as FolderOpenIcon,
  Replay as ReplayIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { ScrollReveal } from '@/components/landing/ScrollReveal';
import { LandingNavbar } from '@/components/landing/navbar';
import Link from 'next/link';
import { LandingFooter } from '@/components/landing/footer';
import { paths } from '@/paths';


export default function Home() {
  return (
    <>
      <LandingNavbar />

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',          // ocupa a tela toda
          display: 'flex',
          alignItems: 'center',        // centraliza verticalmente
          bgcolor: '#0f1419',          // cor solicitada
          color: 'primary.contrastText',
          textAlign: 'center',


        }}
      >
        <Container maxWidth="md">
          <ScrollReveal>
            <Typography variant="h2" component="h1" gutterBottom>
              Crie e organize avaliações com facilidade
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Typography variant="h5" sx={{ mb: 5, opacity: 0.9 }}>
              O SEA é o sistema completo para professores elaborarem, gerenciarem e reutilizarem provas escolares de forma simples e eficiente.
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Button component={Link} href={paths.auth.signIn} variant="contained">
                Entrar
              </Button>

              <Button component={Link} href={paths.auth.signUp} variant="outlined">
                Começar agora
              </Button>
            </Stack>
          </ScrollReveal>
        </Container>
      </Box>

      <Divider />

      {/* Seção Benefícios */}
      <Box sx={{
        bgcolor: '#0f1419', py: { xs: 8, md: 12 }, minHeight: '100vh', display: 'flex',
        alignItems: 'center'
      }}>
        <Container>
          <ScrollReveal>
            <Typography
              variant="h1"
              component="h2"
              textAlign="center"
              gutterBottom
              color="primary"
            >
              Benefícios do SEA
            </Typography>
          </ScrollReveal>


          <Grid container spacing={4}>
            {[
              {
                icon: SpeedIcon,
                title: 'Criação rápida de provas',
                text: 'Monte avaliações completas em poucos minutos com interface intuitiva.',
              },
              {
                icon: FolderOpenIcon,
                title: 'Organização em dia',
                text: 'Mantenha tudo estruturado e fácil de encontrar quando precisar.',
              },
              {
                icon: ReplayIcon,
                title: 'Reaproveitamento de questões',
                text: 'Use um banco de questões de diversos vestibulares e avaliações.',
              },
              {
                icon: SchoolIcon,
                title: 'Facilidade para professores',
                text: 'Interface pensada exclusivamente para o dia a dia do docente.',
              },
            ].map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
                <ScrollReveal delay={index * 0.1}>
                  <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                    <item.icon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.text}
                    </Typography>
                  </Card>
                </ScrollReveal>
              </Grid>
            ))}
          </Grid>

        </Container>
      </Box>

      <Divider />


      {/* CTA Final */}
      <Box
        sx={{
          bgcolor: '#0f1419',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container>
          <ScrollReveal>
            <Typography variant="h2" textAlign="center" color="primary">
              Sobre nós
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Typography variant="h6" textAlign="center" color="text.secondary" maxWidth="md" mx="auto" mb={8} lineHeight={1.7} > Conheça os desenvolvedores responsáveis pela criação do SEA, unindo tecnologia e educação para facilitar o dia a dia de professores. </Typography>
          </ScrollReveal>


          {/* Cards dos desenvolvedores */}
          <Grid container spacing={4} justifyContent="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <ScrollReveal delay={0.15}>
                <Card sx={{ p: 4, textAlign: 'center' }}>
                  <Avatar src="/assets/dev1.png" sx={{ width: 120, height: 120, mx: 'auto', mb: 3 }} />
                  <Typography variant="h5" fontWeight={600} gutterBottom> Joel Damasceno Parente </Typography> <Typography variant="body1" color="text.secondary" mb={2}> Estudante e desenvolvedor full stack, responsável pela arquitetura e integração das principais funcionalidades do SEA. </Typography> <Typography variant="body2" color="text.secondary"> Tecnologias: Next.js, React, TypeScript, Node.js, PHP </Typography>
                </Card>
              </ScrollReveal>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <ScrollReveal delay={0.25}>
                <Card sx={{ p: 4, textAlign: 'center' }}>
                  <Avatar src="/assets/dev2.jpeg" sx={{ width: 120, height: 120, mx: 'auto', mb: 3 }} />
                  <Typography variant="h5" fontWeight={600} gutterBottom> Igor Nobre Teles </Typography> <Typography variant="body1" color="text.secondary" mb={2}> Desenvolvedor focado em design de interfaces e usabilidade, garantindo que o SEA seja simples, acessível e eficiente. </Typography> <Typography variant="body2" color="text.secondary"> Tecnologias: Material UI, UX/UI, Design Systems </Typography>
                </Card>
              </ScrollReveal>
            </Grid>
          </Grid>

        </Container>
      </Box>

      <LandingFooter />
    </>
  );
}