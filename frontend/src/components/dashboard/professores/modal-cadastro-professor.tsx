"use client";

import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Stack, FormControl, InputLabel,
  OutlinedInput, FormHelperText, Checkbox, FormControlLabel
} from "@mui/material";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";
import { EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlashIcon } from "@phosphor-icons/react/dist/ssr/EyeSlash";

const schema = zod.object({
  nome: zod.string().min(3, "Nome obrigatório"),
  email: zod.string().email("E-mail inválido"),
  telefone: zod.string().optional(),
  senha: zod.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormValues = zod.infer<typeof schema>;

export default function ModalCadastroProfessor({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: (data?: any) => void;
}) {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      senha: "",
    },
  });

  const InputTelefone = React.forwardRef<HTMLInputElement, any>(
    function InputTelefone(props, ref) {
      return (
        <IMaskInput
          {...props}
          inputRef={ref}
          mask="(00) 00000-0000"
          overwrite
          definitions={{ 0: /\d/ }}
        />
      );
    }
  );

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const userFromStorage = JSON.parse(localStorage.getItem("user") || "{}");

      const payload = {
        id_escola: userFromStorage?.id_escola ?? null,
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        telefone: data.telefone || null,
        tipo: "professor",
        ativo: 1,
      };

      await axios.post(
        "http://localhost/sea/backend/controllers/UsuarioController.php",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      onSuccess?.(payload);
      onClose();

    } catch (error) {
      console.error("Erro ao cadastrar professor", error);
      alert("Erro ao cadastrar professor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Cadastrar Professor</DialogTitle>

      <DialogContent>
        <form id="form-professor" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} mt={1}>

            {/* Nome */}
            <Controller
              name="nome"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.nome}>
                  <InputLabel>Nome</InputLabel>
                  <OutlinedInput {...field} label="Nome" />
                  {errors.nome && <FormHelperText>{errors.nome.message}</FormHelperText>}
                </FormControl>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.email}>
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput {...field} label="Email" type="email" />
                  {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                </FormControl>
              )}
            />

            {/* Telefone */}
            <Controller
              name="telefone"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel>Telefone</InputLabel>
                  <OutlinedInput
                    {...field}
                    label="Telefone"
                    inputComponent={InputTelefone as any}
                  />
                  {errors.telefone && <FormHelperText>{errors.telefone.message}</FormHelperText>}
                </FormControl>
              )}
            />

            {/* Senha */}
            <Controller
              name="senha"
              control={control}
              render={({ field }) => {
                const [show, setShow] = useState(false);
                return (
                  <FormControl error={!!errors.senha}>
                    <InputLabel>Senha</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Senha"
                      type={show ? "text" : "password"}
                      endAdornment={
                        show ? (
                          <EyeIcon onClick={() => setShow(false)} cursor="pointer" />
                        ) : (
                          <EyeSlashIcon onClick={() => setShow(true)} cursor="pointer" />
                        )
                      }
                    />
                    {errors.senha && <FormHelperText>{errors.senha.message}</FormHelperText>}
                  </FormControl>
                );
              }}
            />
          </Stack>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          form="form-professor"
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}