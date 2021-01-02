"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var ChatSchema = new Schema({
    message: { type: String, "default": "", trim: true, maxlength: 200 },
    sender: { type: mongoose_1["default"].Types.ObjectId, ref: "User" },
    receiver: { type: mongoose_1["default"].Types.ObjectId, ref: "User" },
    createdAt: { type: Date, "default": Date.now }
});
ChatSchema.statics = {
    load: function (options, cb) {
        options.select = options.select || "message sender receiver createdAt";
        return this.findOne(options.criteria)
            .select(options.select)
            .exec(cb);
    },
    list: function (options) {
        var criteria = options.criteria || {};
        return this.find(criteria)
            .populate("sender", "name username github")
            .populate("receiver", "name username github")
            .sort({ createdAt: -1 })
            .limit(options.perPage)
            .skip(options.perPage * options.page);
    }
};
mongoose_1["default"].model("Chat", ChatSchema);
