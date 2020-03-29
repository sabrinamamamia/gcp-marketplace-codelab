"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var DATABASE_PATH = process.env.PROCUREMENT_CODELAB_DATABASE;
/** JSON-based implementation of a simple file-based database. */
var JsonDatabase = /** @class */ (function () {
    function JsonDatabase() {
        var _this = this;
        this.database = {};
        fs_1.readFile(DATABASE_PATH, function (error, data) {
            _this.database = JSON.parse(data.toString());
        });
    }
    /** Reads a record from the database. */
    JsonDatabase.prototype.read = function (key) {
        if (key in this.database) {
            return this.database[key];
        }
    };
    /** Writes a record to the database. */
    JsonDatabase.prototype.write = function (key, value) {
        this.database[key] = value;
        this.commit();
    };
    /** Deletes a record from the database. */
    JsonDatabase.prototype["delete"] = function (key) {
        delete this.database[key];
    };
    /** Commits the in-memory data to disk. */
    JsonDatabase.prototype.commit = function () {
        fs_1.writeFile(DATABASE_PATH, JSON.stringify(this.database), function (error) {
            if (error) {
                console.log(error);
                return;
            }
        });
    };
    /** Returns all the values in the database. */
    JsonDatabase.prototype.getAll = function () {
        var items = [];
        for (var key in this.database) {
            items.push(this.database[key]);
        }
        return items;
    };
    return JsonDatabase;
}());
exports.JsonDatabase = JsonDatabase;
