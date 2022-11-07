import { VStack, Icon, useToast, FlatList } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { api } from "../services/api";
import { PollCardProps, PollCard } from "../components/PollCard";
import { Loading } from "../components/Loading";
import { EmptyPollList } from "../components/EmptyPollList";

export function Polls() {
  const { navigate } = useNavigation();
  const toast = useToast();
  const [pollList, setPollList] = useState<PollCardProps[]>([]);
  const [loadingFetch, setLoadingFetch] = useState(true);

  async function fetchPolls() {
    try {
      setLoadingFetch(true);
      const response = await api.get("polls");

      setPollList(response.data.polls);
    } catch (error) {
      return toast.show({
        title: "Não foi possível carregar os bolões",
        placement: "top",
        backgroundColor: "red.500",
      });
    } finally {
      setLoadingFetch(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPolls();
    }, [])
  );

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigate("find")}
        />
      </VStack>

      {loadingFetch ? (
        <Loading />
      ) : (
        <FlatList
          data={pollList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PollCard
              data={item}
              onPress={() =>
                navigate("details", {
                  id: item.id,
                })
              }
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPollList />}
        />
      )}
    </VStack>
  );
}
