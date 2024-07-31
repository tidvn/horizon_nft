import { SpendingValidator } from "lucid-cardano";

const mintingPolicy: SpendingValidator =
{
  type: "PlutusV2",
  script: "49480100002221200101",
};

export default mintingPolicy;