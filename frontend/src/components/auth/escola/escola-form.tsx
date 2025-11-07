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

import { paths } from "@/paths";

// ✅ Schema dividido por etapas
const step1Schema = zod.object({
	nome: zod.string().min(3, { message: "O nome da escola é obrigatório" }),
	email: zod.string().email({ message: "E-mail inválido" }),
	telefone: zod.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido"),
});

const step2Schema = zod.object({
	cep: zod
		.string()
		.regex(/^\d{5}-\d{3}$/, "CEP inválido (ex: 12345-678)")
		.nonempty("CEP é obrigatório"),
	rua: zod.string().nonempty("Rua é obrigatória"),
	numero: zod.string().nonempty("Número é obrigatório"),
	bairro: zod.string().nonempty("Bairro é obrigatório"),
	estado: zod.string().nonempty("Estado é obrigatório"),
	termos: zod.boolean().refine((v) => v, "Você deve aceitar os termos e condições"),
});

const schema = step1Schema.and(step2Schema);

type Values = zod.infer<typeof schema>;

const defaultValues: Values = {
	nome: "",
	email: "",
	telefone: "",
	cep: "",
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

			await new Promise((resolve) => setTimeout(resolve, 1200));

			if (values.email === "teste@exemplo.com") {
				setError("root", {
					type: "server",
					message: "Este e-mail já está cadastrado.",
				});
				setIsPending(false);
				return;
			}

			setSuccess(true);
			setIsPending(false);

			setTimeout(() => {
				router.push(paths.auth.signIn);
			}, 1500);
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
	const InputCEP = React.forwardRef<HTMLInputElement, any>(function InputCEP(props, ref) {
		return (
			<IMaskInput
				{...props}
				inputRef={ref}     // <- IMask usa "inputRef" ao invés de "ref"
				mask="00000-000"
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
								name="cep"
								render={({ field }) => (
									<FormControl error={Boolean(errors.cep)}>
										<InputLabel>CEP</InputLabel>
										<OutlinedInput
											{...field}
											inputComponent={InputCEP as any}
											label="CEP"
										/>
										{errors.cep && <FormHelperText>{errors.cep.message}</FormHelperText>}
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
