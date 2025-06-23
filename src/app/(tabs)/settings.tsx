import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import  Providers  from "../providers";
import { Header } from "../../shared/ui/header/header";
import { Settings } from "../../modules/settings/settings";
import { AlbumHeader } from "../../modules/albums/ui/album-header/album-header";



export default function SettingsPage() {
// 	const {refetch} = useAlbums()
// 	const router = useRouter()

// 	useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await refetch()
// 		console.log(res)
//       } catch (error: any) {
//         console.error("error retfching data")
//       } finally {
//         setTimeout(await refetch(), 4000)
//         // const reload = router.reload()
// 		// console.log("reload", reload)
// 		const navigate = router.navigate("/settings")
// 		console.log("navigation", navigate)
// 		const replace = router.replace("/settings")
// 		console.log("replace", replace)
//       }
//     }
//       fetchData()
// 	  console.log("refetch is active...")
//   }, [])

	return (
		<Providers>
			<SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
				<AlbumHeader />
			</SafeAreaView>
		</Providers>
	);
}
