import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity, TextInput, LogBox } from "react-native";
import { DopingProfile, RootStackParamList } from "../../utils/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useEffect, useState } from "react";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { useUserConsumer } from "../../utils/user/user.consumer";
import Ionicons from "@expo/vector-icons/Ionicons";
import MapView, { Marker } from "react-native-maps";
import DateTimePicker from "@react-native-community/datetimepicker";

type ProfileProps = NativeStackScreenProps<RootStackParamList, "Profile">;

export const ProfileScreen = ({ navigation }: ProfileProps) => {
  LogBox.ignoreAllLogs();

  const {
    theme: { colors },
  } = useThemeConsumer();

  const { usr } = useUserConsumer();
  const [profil, setProfil] = useState<DopingProfile>();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(new Date());
  const [rerender, setRerender] = useState(0);
  const [show, setShow] = useState(false);
  const [input, setInput] = useState(false);
  const [locError, setLocError] = useState("");

  const getProfile = async () => {
    try {
      const response = await fetch(
        `http://192.168.100.4:8088/ords/atp_tour/itiaservice/profile/${usr.id}`
      );
      const json = await response.json();
      setProfil({
        id: json.id_profil,
        adresa: json.adresa,
        lat: json.latitudine,
        lng: json.longitudine,
        informatii: json.informatii,
        ora_start: json.ora_start,
        minute_start: json.minute_start,
      });
      setError("");
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };

  const updateProfile = async () => {
    if (input) {
      setLocError(
        "Location not found! Please choose from one of the suggested addresses!"
      );
      return;
    }
    try {
      const response = await fetch(
        `http://192.168.100.4:8088/ords/atp_tour/itiaservice/profile/${profil?.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adresa: profil?.adresa,
            latitudine: profil?.lat,
            longitudine: profil?.lng,
            informatii: profil?.informatii,
            ora_start: profil?.ora_start,
            minute_start: profil?.minute_start,
          }),
        }
      );
      const json = await response.json();
      const statusCode = response.status;
      setIsUpdating(statusCode !== 200);
      setError("");
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (!isUpdating) {
      getProfile();
      setRerender(1 - rerender);
    }
  }, [isUpdating]);

  useEffect(() => {
    if (isUpdating) {
      setProfil({
        ...profil,
        ora_start: data.getHours(),
        minute_start: data.getMinutes(),
      });
    }
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          paddingBottom: 5,
          borderBottomColor: colors.medium,
          borderBottomWidth: 3,
        }}
      >
        <View style={{ width: "15%" }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name={"arrow-back-outline"}
            size={35}
            color={colors.dark}
          />
        </View>

        <View
          style={{
            width: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 28 }}>Your Profile</Text>
        </View>
        <View style={{ width: "15%" }}></View>
      </View>
      {error && (
        <View style={{ padding: 10, alignItems: "center" }}>
          <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
            There was an error loading your profile!
          </Text>
          <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
            We are sorry for the inconvenience!
          </Text>
        </View>
      )}
      {locError && (
        <View style={{ padding: 10, alignItems: "center" }}>
          <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
            {locError}
          </Text>
        </View>
      )}
      {!isUpdating && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: 150,
              borderRadius: 20,
              backgroundColor: colors.dark,
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
            onPress={() => {
              setIsUpdating(true);
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: colors.textDark,
              }}
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {isUpdating && (
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            style={{
              width: 150,
              borderRadius: 20,
              backgroundColor: colors.dark,
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
            onPress={() => {
              setIsUpdating(false);
              setLocError("");
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: colors.textDark,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 150,
              borderRadius: 20,
              backgroundColor: colors.dark,
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
            onPress={() => {
              updateProfile();
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: colors.textDark,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ padding: 10 }} key={rerender}>
        <Text style={{ fontSize: 16 }}>Location</Text>
        <GooglePlacesAutocomplete
          styles={{
            container: { flex: 0 },
            textInput: {
              fontSize: 16,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.medium,
              marginTop: 8,
              marginBottom: 0,
              paddingVertical: 2,
            },
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder={profil?.adresa || ""}
          textInputProps={{
            editable: isUpdating,
            onKeyPress: () => setInput(true),
          }}
          minLength={2}
          onPress={(data, details = null) => {
            setLocError("");
            setInput(false);
            setProfil({
              ...profil,
              adresa: data.description,
              lat: details?.geometry.location.lat,
              lng: details?.geometry.location.lng,
            });
          }}
          fetchDetails={true}
          query={{
            key: Constants.expoConfig?.extra?.apiKey,
            language: "en",
          }}
        />
      </View>
      {profil?.lat && profil?.lng && (
        <View style={{ height: "30%" }}>
          <MapView
            style={{ flex: 1 }}
            mapType="standard"
            region={{
              latitude: profil?.lat!,
              longitude: profil?.lng!,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{
                latitude: profil?.lat!,
                longitude: profil?.lng!,
              }}
              title="Location"
              description={profil?.adresa}
              identifier="location"
            />
          </MapView>
        </View>
      )}
      <View style={{ paddingHorizontal: 10, marginTop: 8 }}>
        <Text style={{ fontSize: 16 }}>Additional information</Text>
        <TextInput
          style={[
            {
              fontSize: 16,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors.medium,
              marginTop: 8,
              padding: 10,
              color: "#1b1b1f",
            },
            !isUpdating && { color: "rgba(27, 27, 31, 0.6)" },
          ]}
          editable={isUpdating}
          multiline={true}
          numberOfLines={2}
          value={profil?.informatii}
          autoCapitalize="sentences"
          onChangeText={(text) => {
            setProfil({
              ...profil,
              informatii: text,
            });
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
        <Text style={{ fontSize: 16 }}>Time interval</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 7,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>
            {profil?.ora_start
              ? `${
                  profil.ora_start < 10
                    ? "0" + profil.ora_start
                    : profil.ora_start
                }:${
                  profil.minute_start! < 10
                    ? "0" + profil.minute_start
                    : profil.minute_start
                } - ${
                  profil.ora_start == 23
                    ? "00"
                    : profil.ora_start + 1 < 10
                    ? "0" + (profil.ora_start + 1)
                    : profil.ora_start + 1
                }:${
                  profil.minute_start! < 10
                    ? "0" + profil.minute_start
                    : profil.minute_start
                }`
              : "-"}
          </Text>
          {isUpdating && (
            <TouchableOpacity
              style={{
                backgroundColor: colors.medium,
                padding: 5,
                borderRadius: 10,
              }}
              onPress={() => {
                setShow(true);
              }}
            >
              <Ionicons name={"time"} size={30} color={colors.textMedium} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={data}
          mode="time"
          is24Hour={true}
          display="default"
          accentColor={colors.medium}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || data;
            setShow(false);
            setData(currentDate);
          }}
        />
      )}
    </SafeAreaView>
  );
};
