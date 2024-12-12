import { Effect, Function as EffectFunction } from "effect";

import ky, { type Input, type Options } from "ky";

export const baseClient = ky.create({
	prefixUrl: import.meta.env.VITE_BACKEND_URL,
});

export const get = (url: Input, options?: Options) =>
	Effect.tryPromise({
		try: (signal) => baseClient.get(url, { ...options, signal }).json(),
		catch: EffectFunction.constVoid,
	});

export const post = (url: Input, options?: Options) =>
	Effect.tryPromise({
		try: (signal) => baseClient.post(url, { ...options, signal }).json(),
		catch: EffectFunction.constVoid,
	});

export const patch = (url: Input, options?: Options) =>
	Effect.tryPromise({
		try: (signal) => baseClient.patch(url, { ...options, signal }).json(),
		catch: EffectFunction.constVoid,
	});
