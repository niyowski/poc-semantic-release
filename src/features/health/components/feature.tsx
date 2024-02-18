"use client";

import useSWR from "swr";

import { API_URL } from "~/constants";

const getData = async () => {
  const endpoint = `${API_URL}/health`;
  const response = await fetch(endpoint, { next: { revalidate: 0 } });

  return response.text();
};

export const Feature: React.FC = () => {
  const { data, error, isLoading } = useSWR("/api/health", getData);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <p className="mt-8 text-blue-500">Server health: {data}</p>;
};
