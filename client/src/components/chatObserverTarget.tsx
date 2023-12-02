'use client';

import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export function ChatObserverTarget({
  limit,
  setLimit,
}: {
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
}) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLimit(limit + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [limit]);

  return (
    <div
      ref={observerTarget}
      className='flex items-center justify-center w-full text-[12px] font-semibold capitalize px-2 mb-2 py-0.5'
    >
      <p className='bg-gray-50 px-3'>Loading older messages</p>
    </div>
  );
}
