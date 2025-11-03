'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlashIcon } from "@phosphor-icons/react/dist/ssr/EyeSlash";
import { Controller, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { z as zod } from "zod";



import { paths } from '@/paths';





// 🧩 Validação do cadastro do gestor
const schema = zod.object({
  nome: zod.string().min(3, { message: 'O nome completo é obrigatório' }),
  email: zod.string().email({ message: 'E-mail inválido' }),
  telefone: zod
    .string()
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Telefone inválido'),
  senha: zod.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
  termos: zod.boolean().refine((v) => v, 'Você deve aceitar os termos e condições'),
});

type Values = zod.infer<typeof schema>;

const defaultValues: Values = {
  nome: '',
  email: '',
  telefone: '',
  senha: '',
  termos: false,
};

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      setSuccess(false);

      // Simulação de requisição
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Exemplo de bloqueio
      if (values.email === 'teste@exemplo.com') {
        setError('root', { type: 'server', message: 'Este e-mail já está cadastrado.' });
        setIsPending(false);
        return;
      }

      setSuccess(true);
      setIsPending(false);

      // Após sucesso, vai para o cadastro da escola
      setTimeout(() => {
        router.push('/auth/sign-up/escola');
      }, 1500);
    },
    [router, setError]
  );

  return (
		<Stack spacing={3}>
			<Stack spacing={1}>
				<Typography variant="h4">Cadastro do Gestor</Typography>
				<Typography color="text.secondary" variant="body2">
					Já possui uma conta?{" "}
					<Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
						Entrar
					</Link>
				</Typography>
			</Stack>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2}>
					<Controller
						control={control}
						name="nome"
						render={({ field }) => (
							<FormControl error={Boolean(errors.nome)}>
								<InputLabel>Nome completo</InputLabel>
								<OutlinedInput {...field} label="Nome completo" />
								{errors.nome ? <FormHelperText>{errors.nome.message}</FormHelperText> : null}
							</FormControl>
						)}
					/>

					<Controller
						control={control}
						name="email"
						render={({ field }) => (
							<FormControl error={Boolean(errors.email)}>
								<InputLabel>E-mail</InputLabel>
								<OutlinedInput {...field} label="E-mail" type="email" />
								{errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
							</FormControl>
						)}
					/>

					<Controller
						name="telefone"
						control={control}
						render={({ field }) => (
							<FormControl error={Boolean(errors.telefone)}>
								<InputLabel>Telefone</InputLabel>
								<OutlinedInput
									{...field}
									label="Telefone"
									inputComponent={IMaskInput as any}
									inputProps={{
										mask: "(00) 00000-0000",
										overwrite: true,
										definitions: { 0: /\d/ },
									}}
									sx={{
										backgroundColor: field.value ? "rgba(63, 81, 181, 0.08)" : "transparent",
										transition: "background-color 0.3s",
										"&.Mui-focused": { backgroundColor: "rgba(63, 81, 181, 0.12)" },
									}}
								/>
								{errors.telefone && <FormHelperText>{errors.telefone.message}</FormHelperText>}
							</FormControl>
						)}
					/>

					<Controller
						control={control}
						name="senha"
						render={({ field }) => {
							const [showPassword, setShowPassword] = React.useState(false);

							return (
								<FormControl error={Boolean(errors.senha)}>
									<InputLabel>Senha</InputLabel>
									<OutlinedInput
										{...field}
										label="Senha"
										type={showPassword ? "text" : "password"}
										endAdornment={
											showPassword ? (
												<EyeIcon
													cursor="pointer"
													fontSize="var(--icon-fontSize-md)"
													onClick={() => setShowPassword(false)}
												/>
											) : (
												<EyeSlashIcon
													cursor="pointer"
													fontSize="var(--icon-fontSize-md)"
													onClick={() => setShowPassword(true)}
												/>
											)
										}
										sx={{
											backgroundColor: field.value ? "rgba(63, 81, 181, 0.08)" : "transparent",
											transition: "background-color 0.3s",
											"&.Mui-focused": {
												backgroundColor: "rgba(63, 81, 181, 0.12)",
											},
										}}
									/>
									{errors.senha ? <FormHelperText>{errors.senha.message}</FormHelperText> : null}
								</FormControl>
							);
						}}
					/>

					<Controller
						control={control}
						name="termos"
						render={({ field }) => (
							<div>
								<FormControlLabel
									control={<Checkbox {...field} checked={field.value} />}
									label={
										<React.Fragment>
											Li e aceito os <Link>termos e condições</Link>
										</React.Fragment>
									}
								/>
								{errors.termos ? <FormHelperText error>{errors.termos.message}</FormHelperText> : null}
							</div>
						)}
					/>

					{errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
					{success ? <Alert color="success">Cadastro realizado com sucesso!</Alert> : null}

					<Button disabled={isPending} type="submit" variant="contained">
						{isPending ? "Cadastrando..." : "Cadastrar"}
					</Button>
				</Stack>
			</form>
		</Stack>
	);
}