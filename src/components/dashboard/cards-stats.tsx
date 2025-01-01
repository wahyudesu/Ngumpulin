import React from 'react';

interface CardProps {
  title: string;
  body: number;
}

const Card: React.FC<CardProps> = ({ title, body }) => (
  <div className="border rounded-lg p-4 gap-2">
    <div className="font-medium">{title}</div>
    <div className="text-2xl">{body}</div>
  </div>
);

interface CardStatsProps {
  cardData: { title: string; body: number }[];
}

const CardStats: React.FC<CardStatsProps> = () => {
  const cardData = [
    { title: 'Total tugas', body: 5 },
    { title: 'Total kehadiran siswa', body: 10 },
    { title: 'Total Kelas', body: 6 },
    { title: 'Total mahasiswa', body: 102 },
  ];

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-4 mb-4">
      {cardData.map((card, index) => (
        <div key={index}>
          <Card title={card.title} body={card.body} />
        </div>
      ))}
    </div>
  );
};

export default CardStats;