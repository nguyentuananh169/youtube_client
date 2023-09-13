import SkeletonLoading from '../../../../../components/SkeletonLoading';
function Loading({ count }) {
    return Array(Number(count))
        .fill(0)
        .map((item, index) => (
            <tr key={index}>
                <td>
                    <SkeletonLoading width="382px" height="25px" />
                </td>
                <td>
                    <SkeletonLoading height="25px" />
                </td>
                <td>
                    <SkeletonLoading height="25px" />
                </td>
                <td>
                    <SkeletonLoading height="25px" />
                </td>
            </tr>
        ));
}

export default Loading;
