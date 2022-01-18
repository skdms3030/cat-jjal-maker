//즐겨찾기 한칸 컴포넌트
function CatItem(props) {
    return (
        <li>
            <img src={props.img} style={{ width: "150px" }} />
        </li>
    )
}

export default CatItem;