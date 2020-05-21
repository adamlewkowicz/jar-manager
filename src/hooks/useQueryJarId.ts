import { useRouter } from 'next/router';

export const useQueryJarId = (): number => {
  const router = useRouter();
  const { jarId } = router.query;
  const parsedJarId = Number(jarId);

  if (!Number.isNaN(parsedJarId) && parsedJarId !== 0) {
    return parsedJarId;
  }

  return null;
};
