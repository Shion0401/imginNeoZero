//対象ユーザの投稿画面
import React, { useState, useEffect, useCallback } from 'react'; // React用
import { useNavigate, useParams } from 'react-router-dom'; // ページ遷移用
import styles from './other_users.module.css'; // CSSモジュール
import fontstyles from '../font/font.module.css';
import Left2Img from '../image/Left2.png'; //259:550
import Right2Img from '../image/Right2.png'; //259:750


const OtherUsers = () => {
  const navigate = useNavigate(); // ページ遷移用
  const { id } = useParams(); // パラメータ取得
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  };
  const userid = getCookie('userid');

  const handleTop = () => { // 「トップページに戻る」ボタン押下
    navigate('/top'); // トップページに移動
  };

 

  const inputStyle = {
    fontFamily: 'CraftMincho, serif'
  };

  useEffect(() => {
      const fetchPosts = async () => {
        if (!id) {
          setIsLoading(false);
          return;
        }
  
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost:8080/post/get/${id}`);
          if (!response.ok) {
            throw new Error('投稿の取得に失敗しました');
          }
          const data = await response.json();
          setPosts(data.posts);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPosts();
    }, [id]);
    
    const handlead1 = () => {
      //外部サイトへ飛ぶ(新しいタブで)
      window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_shinomori.shtml', '_blank', 'noopener noreferrer')
    };
  
    const handlead2 = () => {
      //外部サイトへ飛ぶ(新しいタブで)
      window.open('https://www.info.kochi-tech.ac.jp/faculty_members/profile_iwata.shtml', '_blank', 'noopener noreferrer')
    };
  return (
    <div className={fontstyles.fontFamily}>
      <div className={styles.body}>

      <div className={styles.left}>
        <button // 「トップページへ戻る」ボタン
          className={styles.topButton}
          onClick={handleTop}
          style={inputStyle}
        >
          トップページへ戻る
        </button>

        <div className={styles.advertisement}>
        <button
            className={styles.adbutton}
              onClick={handlead1}
            >
          <img
            src={Left2Img} // 広告サンプル
            alt="Left2Img" // 代替テキスト
          />
          </button>
        </div>
      </div>

      <div className={styles.center}>
      {isLoading ? (
            <div>読み込み中...</div> // ローディング中の表示
          ) : posts.length === 0 ? (
            <div>投稿がありません</div> // 投稿がない場合の表示
          ) : (
            <>
        <div className={styles.title}>{posts[0].name}のページ</div>
          <div className={styles.media}>
            {posts.map((post) => (
              <div key={post.id} className={styles.white}>           
                <div className={styles.post}>
                  <div className={styles.picture}>{post.image}</div>
                  
                  <div className={styles.info}>
                    
                    <div className={styles.comment}>{post.comment}ワン</div>
                  </div>
                </div>
              </div> 
            ))}
           </div>
         </>
       )}
     </div>

      <div className={styles.right}>
        <div className={styles.advertisement2}>
        <button
            className={styles.adbutton}
              onClick={handlead2}
            >
          <img
            src={Right2Img} // 広告サンプル
            alt="Right2Img" // 代替テキスト
          />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
export default OtherUsers;
