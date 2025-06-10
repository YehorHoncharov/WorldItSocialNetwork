export default function FriendsLayout() {
	return (
		<SafeAreaView style={{flex: 1}} edges={["top",]}>
			<Header/>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			/>
		</SafeAreaView>
	);
}