import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';

export interface CalendarioProps {
  sx?: SxProps;
}

export function Calendario({ sx }: CalendarioProps): React.JSX.Element {
  const [dataSelecionada, setDataSelecionada] = React.useState<Dayjs | null>(dayjs());

  return (
    <Card
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "row",
        height: "100%",
        p: 3,
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
        transition: "all 0.25s ease",
        "&:hover": {
          boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
          transform: "translateY(-2px)",
          background: "rgba(255, 255, 255, 0.75)"
        }
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Stack direction="row" spacing={3} alignItems="center">

          {/* Texto à esquerda */}
          <Stack spacing={1} sx={{ flex: 1, minWidth: 180 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                letterSpacing: "-0.3px",
              }}
            >
              Calendário
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                opacity: 0.8,
              }}
            >
              Visualize datas importantes e selecione um dia.
            </Typography>

          </Stack>

          {/* Calendário à direita */}
          <DateCalendar
            value={dataSelecionada}
            onChange={(newValue) => setDataSelecionada(newValue)}
            sx={{
              "& .MuiPickersCalendarHeader-label": {
                fontWeight: 600,
              },
              "& .MuiPickersDay-root": {
                borderRadius: "8px",
              },
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
