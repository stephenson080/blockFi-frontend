import { useEffect, useState } from "react";
import Modal from "../Overlays/Modal";
import Input from "./Input";
import {
  addCredential,
  addInstitution,
} from "../../web3/interactions/write-interactions";
import { useSigner } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import SelectIssuer from "../Tabs/SelectIssuer";
import {
  getInstitution,
  getInstitutions,
} from "../../web3/interactions/read-interacteration";
import SelectCredentialType from "../Tabs/SelectCredentialType";
import { FileUploader } from "react-drag-drop-files";
import { storeFiles } from "../../web3/web3storage.filecoin";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AddCredentail(props: Props) {
  const [state, setState] = useState<{
    cid: string;
    credential_no: string;
    timestamp: number;
    type: number;
    issuer: number;
  }>({ cid: "", credential_no: "", timestamp: 0, issuer: 0, type: 0 });
  const [uiState, setUiState] = useState({
    formError: true,
    cidError: false,
    credentialNoError: false,
    timeStampError: false,
    typeError: false,
    issuerError: false,
    loading: false,
    uploading: false,
    uploaded: false,
  });
  const [_inst, set_inst] = useState<{ name: string; id: number }[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File) => {
    console.log(file);
    setFile(file);
    uploadingFilesToFilecoin(file);
  };

  const signer = useSigner();

  useEffect(() => {
    _getInstitutions();
  }, []);

  async function _getInstitutions() {
    try {
      const insts = await getInstitutions();
      set_inst([...insts]);
    } catch (error) {}
  }

  async function uploadingFilesToFilecoin(_file: File) {
    try {
      if (!_file) return;
      setUiState({ ...uiState, uploading: true, uploaded: false });
      const cid = await storeFiles(_file);
      onFormChanged("cid", cid);
    } catch (error) {
      onFormChanged("cid", "");
      console.log(error);
    }
  }

  async function submit() {
    const id = toast.loading("Adding Credential");
    try {
      setUiState({ ...uiState, loading: true });

      if (uiState.formError || !signer) {
        setUiState({ ...uiState, loading: false });
        return;
      }

      const trx = await addCredential(
        state.cid,
        state.timestamp,
        state.credential_no,
        state.issuer,
        state.type,
        signer
      );
      await trx.wait(1);
      setUiState({ ...uiState, loading: false });
      toast.dismiss(id);
      toast.success("Credential Added!");
      return;
    } catch (error: any) {
      setUiState({ ...uiState, loading: false });
      toast.dismiss(id);
      toast.error("failed");
    }
  }
  function onFormChanged(
    id: "cid" | "credential" | "timestamp" | "type" | "issuer",
    value: string
  ) {
    let formError = uiState.formError;
    switch (id) {
      case "cid":
        setState({ ...state, cid: value });
        if (!value) {
          setUiState({
            ...uiState,
            cidError: true,
            formError: true,
            uploaded: false,
            uploading: false,
          });
          return;
        }
        formError =
          !state.credential_no ||
          !state.issuer ||
          !state.timestamp ||
          !state.type ||
          uiState.credentialNoError ||
          uiState.issuerError ||
          uiState.typeError ||
          uiState.timeStampError;
        setUiState({
          ...uiState,
          cidError: false,
          formError,
          uploaded: true,
          uploading: false,
        });
        return;
      case "credential":
        setState({ ...state, credential_no: value });
        if (!value) {
          setUiState({ ...uiState, credentialNoError: true, formError: true });
          return;
        }
        formError =
          !state.cid ||
          !state.issuer ||
          !state.timestamp ||
          !state.type ||
          uiState.cidError ||
          uiState.issuerError ||
          uiState.typeError ||
          uiState.timeStampError;
        setUiState({ ...uiState, credentialNoError: false, formError });
        return;
      case "issuer":
        setState({ ...state, issuer: +value });
        if (!value) {
          setUiState({ ...uiState, issuerError: true, formError: true });
          return;
        }
        formError =
          !state.cid ||
          !state.credential_no ||
          !state.timestamp ||
          !state.type ||
          uiState.cidError ||
          uiState.credentialNoError ||
          uiState.typeError ||
          uiState.timeStampError;
        setUiState({ ...uiState, issuerError: false, formError });
        return;
      case "timestamp":
        setState({ ...state, timestamp: +value });
        if (!value) {
          setUiState({ ...uiState, timeStampError: true, formError: true });
          return;
        }
        formError =
          !state.cid ||
          !state.credential_no ||
          !state.issuer ||
          !state.type ||
          uiState.cidError ||
          uiState.credentialNoError ||
          uiState.typeError ||
          uiState.issuerError;
        setUiState({ ...uiState, timeStampError: false, formError });
        return;
      case "type":
        setState({ ...state, type: +value });
        if (!value) {
          setUiState({ ...uiState, typeError: true, formError: true });
          return;
        }
        formError =
          !state.cid ||
          !state.credential_no ||
          !state.issuer ||
          !state.timestamp ||
          uiState.cidError ||
          uiState.credentialNoError ||
          uiState.timeStampError ||
          uiState.issuerError;
        setUiState({ ...uiState, typeError: false, formError });
        return;
    }
  }
  return (
    <Modal
      visible={props.visible}
      onClose={props.onClose}
      title="Add Credential"
      desc="Upload your credential and fill the form below"
      closeTitle="Cancel"
      onsumbit={submit}
      submitTitle="Complete"
      loading={uiState.loading}
    >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
        <div className="space-y-1">
          <div className="my-4">
            <label className="block text-sm font-medium leading-6 text-slate-400">
              {uiState.uploading ? "Uploading File" : "Upload Credential"}
            </label>
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={["JPG", "JPEG", "PNG"]}
            />
          </div>
          {uiState.uploaded && (
            <div>
              <Input
                label="Credential No"
                onChange={(v) => {
                  onFormChanged("credential", v);
                }}
                type="text"
                required
              />
              <Input
                label="Issue Date"
                onChange={(v) => {
                  onFormChanged("timestamp", v);
                }}
                type="date"
                required
              />
              <SelectIssuer
                choices={[{ name: "Select Issuer", id: 0 }].concat([..._inst])}
                onPress={(v) => {
                  onFormChanged("issuer", v.toString());
                }}
              />
              <SelectCredentialType
                onPress={(v) => {
                  onFormChanged("type", v.toString());
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
