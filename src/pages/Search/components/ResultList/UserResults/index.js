import Loading from './Loading';
import Item from './Item';

function UserResults({ resultList = [] }) {
    return (
        <>
            {resultList.map((item) => (
                <Item item={item} key={item.user_id} />
            ))}
        </>
    );
}

export default UserResults;
