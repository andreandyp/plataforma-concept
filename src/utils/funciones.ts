function sleep(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sleepSync(ms: number): void {
  const date = new Date().getTime();
  let currentDate: number | null = null;
  do {
    currentDate = new Date().getTime();
  } while (currentDate - date < ms);
}

export { sleep, sleepSync };
