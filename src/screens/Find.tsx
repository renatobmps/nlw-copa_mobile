import { useNavigation } from "@react-navigation/native";
import { VStack, Heading, useToast } from "native-base";
import { useState } from "react";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function Find() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPoll() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: "Informe um código",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/polls/join", { code });

      toast.show({
        title: "Você entrou no bolão!",
        placement: "top",
        bgColor: "green.500",
      });

      navigate("polls");
    } catch (error) {
      setIsLoading(false);

      if (error.response?.data?.message === "Poll not found") {
        return toast.show({
          title: "Bolão não encontrado.",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.response?.data?.message === "Poll already joined") {
        return toast.show({
          title: "Você já está nesse bolão.",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Não foi possível encontrar o bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
          value={code}
        />
        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPoll}
        />
      </VStack>
    </VStack>
  );
}
