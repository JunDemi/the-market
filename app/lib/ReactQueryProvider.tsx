// 리액트 쿼리 레지스트리
'use client'

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}