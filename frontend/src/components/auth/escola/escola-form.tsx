"use client";

import * as React from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Alert,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Input,
	InputLabel,
	Link,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	Typography,
} from "@mui/material";
import { EyeIcon } from "@phosphor-icons/react/dist/ssr/Eye";
import { EyeSlashIcon } from "@phosphor-icons/react/dist/ssr/EyeSlash";
import { Controller, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { z as zod } from "zod";
import axios from 'axios';

import { paths } from "@/paths";

// ✅ Schema dividido por etapas
const step1Schema = zod.object({
	inep: zod
		.string()
		.regex(/^\d{8}$/, "O código INEP deve conter exatamente 8 números")
		.nonempty("O INEP é obrigatório"),
	nome: zod.string().min(3, { message: "O nome da escola é obrigatório" }),
	email: zod.string().email({ message: "E-mail inválido" }),
	telefone: zod.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido"),
});

const step2Schema = zod.object({
	cidade: zod.string().nonempty("Cidade é obrigatório"),
	rua: zod.string().nonempty("Rua é obrigatória"),
	numero: zod.string().nonempty("Número é obrigatório"),
	bairro: zod.string().nonempty("Bairro é obrigatório"),
	estado: zod.string().nonempty("Estado é obrigatório"),
	termos: zod.boolean().refine((v) => v, "Você deve aceitar os termos e condições"),
});

const schema = step1Schema.and(step2Schema);

type Values = zod.infer<typeof schema>;

const defaultValues: Values = {
	inep: "",
	nome: "",
	email: "",
	telefone: "",
	cidade: "",
	rua: "",
	numero: "",
	bairro: "",
	estado: "",
	termos: false,
};

const estados = [
	{ sigla: "AC", nome: "Acre" },
	{ sigla: "AL", nome: "Alagoas" },
	{ sigla: "AP", nome: "Amapá" },
	{ sigla: "AM", nome: "Amazonas" },
	{ sigla: "BA", nome: "Bahia" },
	{ sigla: "CE", nome: "Ceará" },
	{ sigla: "DF", nome: "Distrito Federal" },
	{ sigla: "ES", nome: "Espírito Santo" },
	{ sigla: "GO", nome: "Goiás" },
	{ sigla: "MA", nome: "Maranhão" },
	{ sigla: "MT", nome: "Mato Grosso" },
	{ sigla: "MS", nome: "Mato Grosso do Sul" },
	{ sigla: "MG", nome: "Minas Gerais" },
	{ sigla: "PA", nome: "Pará" },
	{ sigla: "PB", nome: "Paraíba" },
	{ sigla: "PR", nome: "Paraná" },
	{ sigla: "PE", nome: "Pernambuco" },
	{ sigla: "PI", nome: "Piauí" },
	{ sigla: "RJ", nome: "Rio de Janeiro" },
	{ sigla: "RN", nome: "Rio Grande do Norte" },
	{ sigla: "RS", nome: "Rio Grande do Sul" },
	{ sigla: "RO", nome: "Rondônia" },
	{ sigla: "RR", nome: "Roraima" },
	{ sigla: "SC", nome: "Santa Catarina" },
	{ sigla: "SP", nome: "São Paulo" },
	{ sigla: "SE", nome: "Sergipe" },
	{ sigla: "TO", nome: "Tocantins" }
];

export function SignUpForm(): React.JSX.Element {
	const router = useRouter();
	const [isPending, setIsPending] = React.useState(false);
	const [success, setSuccess] = React.useState(false);
	const [step, setStep] = React.useState(1);

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
		trigger,
	} = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

	const handleNext = async () => {
		const valid = await trigger(["nome", "email", "telefone"]);
		if (valid) setStep(2);
	};

	const handleBack = () => setStep(1);

	const onSubmit = React.useCallback(
		async (values: Values): Promise<void> => {
			setIsPending(true);
			setSuccess(false);

			try {
				// 📦 Recupera os dados do gestor salvos anteriormente
				const gestor = JSON.parse(localStorage.getItem("gestor_temp") || "{}");

				// 🧩 Monta o payload combinando gestor + escola
				const payload = {
					// Dados da escola
					inep: values.inep,
					nome_escola: values.nome,
					email: values.email,
					telefone: values.telefone,
					cidade: values.cidade,
					rua: values.rua,
					num: values.numero,
					bairro: values.bairro,
					estado: values.estado,

					// Dados do gestor
					nome: gestor.nome,
					email_gestor: gestor.email,
					senha: gestor.senha,
					telefone_gestor: gestor.telefone
				};

				// 🚀 Envia para o backend (ajuste o endpoint conforme seu backend)
				const response = await axios.post(
					"http://localhost/sea/backend/controllers/EscolaController.php",
					payload
				);

				if (response.data.sucesso) {
					setSuccess(true);
					localStorage.removeItem("gestor_temp"); // limpa o cache
					setTimeout(() => router.push(paths.auth.signIn), 1500);
				} else {
					throw new Error(response.data.erro || "Erro ao cadastrar");
				}
			} catch (error: any) {
				setError("root", { type: "server", message: error.message });
			} finally {
				setIsPending(false);
			}
		},
		[router, setError]
	);


	const InputTelefone = React.forwardRef<HTMLInputElement, any>(function InputTelefone(props, ref) {
		return (
			<IMaskInput
				{...props}
				inputRef={ref}     // <- IMask usa "inputRef" ao invés de "ref"
				mask="(00) 00000-0000"
				overwrite
				definitions={{ 0: /\d/ }}
			/>
		);
	});
	const InputInep = React.forwardRef<HTMLInputElement, any>(function InputInep(props, ref) {
		return (
			<IMaskInput
				{...props}
				inputRef={ref}     // <- IMask usa "inputRef" ao invés de "ref"
				mask="00000000"
				overwrite
				definitions={{ 0: /\d/ }}
			/>
		);
	});

	return (
		<Stack spacing={3}>
			<Stack spacing={1}>
				<Typography variant="h4">Cadastro da Escola</Typography>
				<Typography color="text.secondary" variant="body2">
					Já possui uma conta?{" "}
					<Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
						Entrar
					</Link>
				</Typography>
			</Stack>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2}>
					{step === 1 && (
						<>
							<Controller
								control={control}
								name="inep"
								render={({ field }) => (
									<FormControl error={Boolean(errors.inep)}>
										<InputLabel>Inep da Escola</InputLabel>
										<OutlinedInput
											{...field}
											inputComponent={InputInep as any}
											label="Inep da Escola"
										/>
										{errors.inep && <FormHelperText>{errors.inep.message}</FormHelperText>}
									</FormControl>
								)}
							/>

							<Controller
								control={control}
								name="nome"
								render={({ field }) => (
									<FormControl error={Boolean(errors.nome)}>
										<InputLabel>Nome da Escola</InputLabel>
										<OutlinedInput {...field} label="Nome da Escola" />
										{errors.nome && <FormHelperText>{errors.nome.message}</FormHelperText>}
									</FormControl>
								)}
							/>

							<Controller
								control={control}
								name="email"
								render={({ field }) => (
									<FormControl error={Boolean(errors.email)}>
										<InputLabel>E-mail Institucional</InputLabel>
										<OutlinedInput {...field} type="email" label="E-mail Institucional" />
										{errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
									</FormControl>
								)}
							/>

							<Controller
								control={control}
								name="telefone"
								render={({ field }) => (
									<FormControl error={Boolean(errors.telefone)}>
										<InputLabel>Telefone</InputLabel>
										<OutlinedInput
											{...field}
											inputComponent={InputTelefone as any}
											label="Telefone"
										/>
										{errors.telefone && <FormHelperText>{errors.telefone.message}</FormHelperText>}
									</FormControl>
								)}
							/>

							<Button variant="contained" onClick={handleNext}>
								Próximo
							</Button>
						</>
					)}

					{step === 2 && (
						<>
							<Controller
								control={control}
								name="cidade"
								render={({ field }) => (
									<FormControl error={Boolean(errors.cidade)}>
										<InputLabel>Cidade</InputLabel>
										<OutlinedInput {...field} label="Cidade" />
										{errors.cidade && <FormHelperText>{errors.cidade.message}</FormHelperText>}
									</FormControl>
								)}
							/>

							<Controller
								control={control}
								name="rua"
								render={({ field }) => (
									<FormControl error={Boolean(errors.rua)}>
										<InputLabel>Rua</InputLabel>
										<OutlinedInput {...field} label="Rua" />
										{errors.rua && <FormHelperText>{errors.rua.message}</FormHelperText>}
									</FormControl>
								)}
							/>

							<Controller
								control={control}
								name="numero"
								render={({ field }) => (
									<FormControl error={Boolean(errors.numero)}>
										<InputLabel>Número</InputLabel>
										<OutlinedInput {...field} label="Número" />
										{errors.numero && <FormHelperText>{errors.numero.message}</FormHelperText>}
									</FormControl>
								)}
							/>

							<Controller
								control={control}
								name="bairro"
								render={({ field }) => (
									<FormControl error={Boolean(errors.bairro)}>
										<InputLabel>Bairro</InputLabel>
										<OutlinedInput {...field} label="Bairro" />
										{errors.bairro && <FormHelperText>{errors.bairro.message}</FormHelperText>}
									</FormControl>
								)}
							/>

							<Controller
								control={control}
								name="estado"
								render={({ field }) => (
									<FormControl error={Boolean(errors.estado)} fullWidth>
										<InputLabel>Estado</InputLabel>
										<Select
											{...field}
											label="Estado"
										>
											{estados.map((estado) => (
												<MenuItem key={estado.sigla} value={estado.sigla}>
													{estado.nome}
												</MenuItem>
											))}
										</Select>
										{errors.estado && <FormHelperText>{errors.estado.message}</FormHelperText>}
									</FormControl>
								)}
							/>

							<Controller
								control={control}
								name="termos"
								render={({ field }) => (
									<FormControlLabel
										control={<Checkbox {...field} checked={field.value} />}
										label={
											<>
												Li e aceito os <Link>termos e condições</Link>
											</>
										}
									/>
								)}
							/>
							{errors.termos && <FormHelperText error>{errors.termos.message}</FormHelperText>}

							{errors.root && <Alert color="error">{errors.root.message}</Alert>}
							{success && <Alert color="success">Cadastro realizado com sucesso!</Alert>}

							<Stack direction="row" spacing={2}>
								<Button variant="outlined" onClick={handleBack}>
									Voltar
								</Button>
								<Button disabled={isPending} type="submit" variant="contained">
									{isPending ? "Cadastrando..." : "Cadastrar"}
								</Button>
							</Stack>
						</>
					)}
				</Stack>
			</form>
		</Stack>
	);
}
