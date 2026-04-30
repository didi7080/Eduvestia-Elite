import { Module } from "./types";

export async function loadManifest() {
  const res = await fetch("/manifest.json");
  return res.json();
}

export async function loadModule(path: string): Promise<Module> {
  const res = await fetch(`/content/${path}/module.json`);
  return res.json();
}
