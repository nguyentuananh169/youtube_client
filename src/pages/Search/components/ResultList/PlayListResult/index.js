import Item from './Item';

function PlayListResult({ resultList = [] }) {
    return (
        <>
            {resultList.map((item) => (
                <Item key={item.playlist_id} item={item} />
            ))}
        </>
    );
}

export default PlayListResult;
