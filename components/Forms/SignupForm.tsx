import { useState } from "react";
import Modal from "../Overlays/Modal";
import Input from "./Input";
import SelectUserTab from "../Tabs/SelectUserType";
import {
  addCandidate,
  addInstitution,
} from "../../web3/interactions/write-interactions";
import { useSigner } from "@thirdweb-dev/react";
import { toast } from "react-toastify";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SignupForm(props: Props) {
  const [state, setState] = useState<{
    name: string;
    url: string;
    user: number;
  }>({ name: "", url: "", user: 1 });
  const [uiState, setUiState] = useState({
    formError: true,
    nameError: false,
    urlError: false,
    loading: false,
  });

  const signer = useSigner();

  async function submit() {
    try {
      setUiState({ ...uiState, loading: true });
      if (uiState.formError || !signer) {
        setUiState({ ...uiState, loading: false });
        return;
      }
      if (state.user === 1) {
        const trx = await addCandidate(state.name, state.url, signer);
        await trx.wait(1);
        setUiState({ ...uiState, loading: false });
        toast.success("Candidate Added!");
        return;
      }
      const trx = await addInstitution(state.name, state.url, signer);
      await trx.wait(1);
      setUiState({ ...uiState, loading: false });
      toast.success("Institution Added!");
    } catch (error: any) {
      setUiState({ ...uiState, loading: false });
      toast.error("failed");
    }
  }
  function onFormChanged(id: "name" | "url", value: string) {
    let formError = uiState.formError;
    switch (id) {
      case "name":
        setState({ ...state, name: value });
        if (!value) {
          setUiState({ ...uiState, nameError: true, formError: true });
          return;
        }
        formError = !state.url || uiState.urlError;
        setUiState({ ...uiState, nameError: false, formError });
        return;
      case "url":
        setState({ ...state, url: value });
        if (!value) {
          setUiState({ ...uiState, urlError: true, formError: true });
          return;
        }
        formError = !state.name || uiState.nameError;
        setUiState({ ...uiState, urlError: false, formError });
        return;
    }
  }
  return (
    <Modal
      visible={props.visible}
      onClose={props.onClose}
      title="Sign Up"
      desc="Seems you are new here. Please complete your sign up"
      closeTitle="Cancel"
      onsumbit={submit}
      submitTitle="Complete"
      loading={uiState.loading}
    >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
        <div className="space-y-1">
          <SelectUserTab onPress={(v) => setState({ ...state, user: v })} />
          <Input
            label="Name"
            onChange={(v) => {
              onFormChanged("name", v);
            }}
            type="text"
            required
          />

          <Input
            label={
              state.user === 1
                ? "Profile url (can be linkedin or portfolio url)"
                : "website"
            }
            onChange={(v) => {
              onFormChanged("url", v);
            }}
            type="text"
            required
          />
        </div>
      </div>
    </Modal>
  );
}
