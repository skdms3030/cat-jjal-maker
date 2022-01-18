//메인 사진 컴포넌트
const MainCard = ({ img, onHeartClick, alreadyFavorites }) => {
    const heartIcon = alreadyFavorites ? "💖" : "🤍"

    return (
        <div className="main-card">
            <img src={img} alt="고양이" width="400" />
            <button onClick={onHeartClick}>{heartIcon}</button>
        </div>
    );
};

export default MainCard;