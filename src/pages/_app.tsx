import "inter-ui/inter.css";
import "tailwindcss/tailwind.css";

import React from "react";

import { Layout } from "components/layout";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { createClient, cacheExchange, fetchExchange, Provider } from "urql";

import { devtoolsExchange } from "@urql/devtools";

import defaultSEOConfig from "../../next-seo.config";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	const client = createClient({
		url: process.env.NEXT_PUBLIC_GQL_URL ?? "http://localhost:4000",
		fetchOptions: {
			credentials: "include",
		},
		exchanges: [devtoolsExchange, cacheExchange, fetchExchange],
	});

	return (
		<Provider value={client}>
			<DefaultSeo {...defaultSEOConfig} />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
};

export default App;
