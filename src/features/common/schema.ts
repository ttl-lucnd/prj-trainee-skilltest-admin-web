import yup from "@/plugins/yup";
import { MAX_INTEGER, Regex } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";

const syncSettingSchema = yup.object({
    sheetLink: yup.string()
        .defined()
        .test(
            'empty-or-valid-url',
            'vocabularies.error.sheetLink',
            (value) => value === '' || (typeof value === 'string' && Regex.SHEET_URL.test(value))
        ),
    lastReadRow: yup.number().min(1).max(MAX_INTEGER).required(),
});

export const syncSettingYupResolver = yupResolver(syncSettingSchema);