import ImageList from "@mui/material/ImageList";
import { useAppSelector } from "../redux/store";
import { selectUsers } from "../redux/user/user.selectors";

// export default function Photographers() {
//     const users = useAppSelector(selectUsers)
//     return (
//         <ImageList sx={{ width: '100%', height: '100%' }} cols={3} rowHeight={164}>
//             {users.map((user) => (
//                 <ImageList.Item key={user.id}>
//                     <img
//                         src={`${user.avatar}?w=164&h=164&fit=crop&auto=format`}
//                         srcSet={`${user.avatar}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
//                         alt={user.fullName}
//                         loading="lazy"
//                     />
//                 </ImageList.Item>
//             ))}
//         </ImageList>
//     );
// }