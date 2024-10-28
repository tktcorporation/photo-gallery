import { Photo } from '../types/photo';

// 200枚のサンプル写真データを生成
export const generatePhotos = (): Photo[] => {
  const categories = [
    { season: '春', items: ['桜', '菜の花', '新緑'] },
    { season: '夏', items: ['海', '花火', '夕焼け'] },
    { season: '秋', items: ['紅葉', '秋空', '稲穂'] },
    { season: '冬', items: ['雪景色', '冬空', '氷'] }
  ];

  const photos: Photo[] = [];
  const baseUrls = [
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    'https://images.unsplash.com/photo-1683009427666-340595e57e43',
    'https://images.unsplash.com/photo-1682687221038-404670f01d03',
    'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1'
  ];

  for (let i = 0; i < 200; i++) {
    const categoryIndex = i % categories.length;
    const category = categories[categoryIndex];
    const urlIndex = i % baseUrls.length;
    
    photos.push({
      id: i + 1,
      url: `${baseUrls[urlIndex]}?random=${i}`,
      title: `${category.season}の風景 ${Math.floor(i / 4) + 1}`,
      tags: [category.season, ...category.items]
    });
  }

  return photos;
};