async function wait(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
}

export async function SlowMessage({ children }: SXL.Props) {
  await wait(2000);
  return <p>{children}</p>;
}

export async function* SlowWithLoading({ children }: SXL.Props) {
  yield <>Loading slow message...</>;
  await Promise.resolve();
  return <SlowMessage>{children}</SlowMessage>;
}
