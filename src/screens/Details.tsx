import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMyPollList } from "../components/EmptyMyPollList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PollCardProps } from "../components/PollCard";
import { PollHeader } from "../components/PollHeader";
import { api } from "../services/api";

interface RoutePrams {
  id: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [pollDetails, setPollDetails] = useState<PollCardProps>(
    {} as PollCardProps
  );
  const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">(
    "guesses"
  );
  const route = useRoute();
  const { id } = route.params as RoutePrams;
  const toast = useToast();

  async function fetchPollDetails() {
    try {
      setIsLoading(true);
      const detailsResponse = await api.get(`polls/${id}`);
      setPollDetails(detailsResponse.data.poll as PollCardProps);
    } catch (error) {
      return toast.show({
        title: "Não foi possível carregar os detalhes",
        placement: "top",
        backgroundColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: pollDetails.code,
    });
  }

  useEffect(() => {
    fetchPollDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} background="gray.900">
      <Header
        title={pollDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {pollDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PollHeader data={pollDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={optionSelected === "guesses"}
              onPress={() => setOptionSelected("guesses")}
            />

            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === "ranking"}
              onPress={() => setOptionSelected("ranking")}
            />
          </HStack>
          <Guesses pollId={pollDetails.id} code={pollDetails.code} />
        </VStack>
      ) : (
        <EmptyMyPollList code={pollDetails.code} />
      )}
    </VStack>
  );
}
