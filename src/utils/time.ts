import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import fr from "javascript-time-ago/locale/fr.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(fr);

export const timeAgo = TimeAgo;
