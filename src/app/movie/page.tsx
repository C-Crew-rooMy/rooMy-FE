import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import styles from './MoviePage.module.css';

//2026.09.10 - 윤소정 : 목업 데이터 추후 삭제하겠습니다. 
const picks = [
  { title: '비 오는 날의 우리', year: '2024', poster: 'one' },
  { title: '블루 아워', year: '2023', poster: 'two' },
  { title: '여름을 달리다', year: '2022', poster: 'three' },
];

const highlights = [
  { quote: '좋아하는 장면은 시간이 지나도 마음 한편에 오래 머문다.', movie: '비 오는 날의 우리', tone: 'mint' },
  { quote: '도시는 잠들지 않았고, 우리도 쉽게 집으로 돌아가지 못했다.', movie: '블루 아워', tone: 'blue' },
  { quote: '그해 여름의 빛과 냄새를 나는 아직도 선명하게 기억한다.', movie: '여름을 달리다', tone: 'peach' },
];

const reviews = [
  { movie: '비 오는 날의 우리', year: '2024', title: '평범한 하루 속 작은 행복', date: '2026.08.24', body: '오늘은 평소보다 조금 일찍 일어났다. 창문을 열자 시원한 바람이 들어와 기분 좋게 하루를 시작할 수 있었다. 아침 식사를 간단히 하고 집 근처 공원을 산책했는데, 푸른 나무와 맑은 하늘을 보니 마음이 한결 편안해졌다.', tags: ['힐링', '로맨스', '잔잔한'], poster: 'one' },
  { movie: '블루 아워', year: '2023', title: '밤의 끝에서 발견한 마음', date: '2026.08.17', body: '차가운 도시의 풍경과 인물의 감정이 조용하게 겹쳐진다. 빠른 전개보다 오래 남는 분위기가 좋았고, 마지막 장면의 여운 때문에 엔딩 크레딧이 끝날 때까지 자리를 뜰 수 없었다.', tags: ['드라마', '미스터리', '영상미'], poster: 'two' },
  { movie: '여름을 달리다', year: '2022', title: '다시 돌아갈 수 없는 계절에게', date: '2026.08.02', body: '눈부신 풍경 사이로 어린 시절의 기억이 천천히 흘러간다. 특별한 사건 없이도 한 사람의 계절을 함께 통과한 것 같은 따뜻함을 건네는 영화였다.', tags: ['성장', '가족', '여름'], poster: 'three' },
];

export default function MoviePage() {
  return (
    <AppLayout>
      <div className={styles.page}>
        <header className={styles.header}>
          <div>
            <div className={styles.titleRow}>
              <h1>Movie</h1><span className={styles.statusDot} aria-hidden="true" /><p>비공개 상태입니다.</p>
            </div>
            <p className={styles.subtitle}>보고 느낀 영화의 장면과 마음을 모아두는 공간</p>
          </div>
          <Link className={styles.writeButton} href="/movie/write">Write <span aria-hidden="true">✎</span></Link>
        </header>

        <section className={styles.dashboard} aria-label="영화 요약">
          <div className={styles.pickSection}>
            <h2>My Pick!</h2>
            <div className={styles.posterList}>
              {picks.map((pick) => (
                <article className={styles.posterCard} key={pick.title}>
                  <div className={`${styles.poster} ${styles[`poster_${pick.poster}`]}`} role="img" aria-label={`${pick.title} 포스터`} />
                  <p>{pick.title} <span>({pick.year})</span></p>
                </article>
              ))}
            </div>
          </div>
          <div className={styles.highlightSection}>
            <h2>Highlights!</h2>
            <div className={styles.highlightList}>
              {highlights.map((item) => (
                <blockquote className={`${styles.note} ${styles[`note_${item.tone}`]}`} key={item.movie}>
                  <span className={styles.pin} aria-hidden="true" /><p>{item.quote}</p><footer>– {item.movie} –</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.toolbar}>
          <label className={styles.search}><span aria-hidden="true">⌕</span><input type="search" placeholder="추억을 검색해보세요." aria-label="영화 기록 검색" /></label>
          <button className={styles.sortButton} type="button">최신순 <span aria-hidden="true">▾</span></button>
        </div>

        <section className={styles.reviewList} aria-label="영화 기록">
          {reviews.map((review) => (
            <article className={styles.review} key={review.title}>
              <div className={styles.reviewContent}>
                <p className={styles.movieMeta}><span aria-hidden="true" />{review.movie} <small>[{review.year}]</small></p>
                <div className={styles.reviewHeading}><h2>{review.title}</h2><time>{review.date}</time></div>
                <p className={styles.reviewBody}>{review.body}</p>
                <ul className={styles.tags} aria-label="태그">{review.tags.map((tag) => <li key={tag}>#{tag}</li>)}</ul>
              </div>
              <div className={`${styles.reviewPoster} ${styles[`poster_${review.poster}`]}`} role="img" aria-label={`${review.movie} 포스터`} />
            </article>
          ))}
        </section>
      </div>
    </AppLayout>
  );
}
