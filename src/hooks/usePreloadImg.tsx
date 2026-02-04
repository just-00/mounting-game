import { useCallback, useRef } from 'react';

const usePreloadImages = () => {
  const memo = useRef<string[]>([])
  const preloadImages = useCallback(async (imgList:string[] = []) => {

    const handled = imgList.filter(item => {
      return !memo.current.includes(item)
    })

    memo.current.push(...imgList)

    if (!handled.length) {
      console.warn('预加载图片列表为空');
      return;
    }

    const preloadSingle = (url: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
      });
    };

    const results = await Promise.allSettled(handled.map(preloadSingle));
    const successList = results.filter(res => res.status === 'fulfilled').map(res => res.value);
    const failList = results.filter(res => res.status === 'rejected').map(res => res.reason);

    if (successList.length) console.log(`预加载成功：${successList.length}张`, successList);
    if (failList.length) console.warn(`预加载失败：${failList.length}张`, failList);

    return { successList, failList };
  }, []);

  return { preloadImages };
};

export default usePreloadImages;