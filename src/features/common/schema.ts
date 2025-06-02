import yup from "@/plugins/yup";
import { MAX_INTEGER, Regex } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";

const syncSettingSchema = yup.object({
    sheetLink: yup.string().matches(Regex.SHEET_URL, 'vocabularies.error.sheetLink').required(),
    lastReadRow: yup.number().min(1).max(MAX_INTEGER).required(),
});

export const syncSettingYupResolver = yupResolver(syncSettingSchema);