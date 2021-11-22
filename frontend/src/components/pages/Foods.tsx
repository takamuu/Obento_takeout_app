// Foodsページ実装時にコメントアウト解除予定（エラーが出るので一時的にコメントアウト）

// import { fetchRestaurants } from 'apis/restaurants';
import { memo, useEffect, VFC } from 'react';
// import { useParams, useLocation } from 'react-router';

// type IdType = {
//   restaurantId: string;
// };

// export const Foods: VFC = memo(() => {
//   useEffect(() => {
//     fetchRestaurants().then((data) => {
//       console.log(data);
//     });
//   }, []);
//   const { restaurantId } = useParams<IdType>();
//   const { search } = useLocation();
//   const query = new URLSearchParams(search);
//   console.log(query);
//   return (
//     <div>
//       <h1>Foodsページ</h1>
//       <p>restaurantIdは {restaurantId}</p>
//       <p>クエリパラメーターは{query.get('name')}です</p>
//       {/* <p>{data}</p> */}
//     </div>
//   );
// });
