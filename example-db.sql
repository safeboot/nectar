/*
 Navicat Premium Data Transfer

 Source Server         : Nectar SQLite
 Source Server Type    : SQLite
 Source Server Version : 3035005 (3.35.5)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3035005 (3.35.5)
 File Encoding         : 65001

 Date: 04/03/2024 13:03:58
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for apps
-- ----------------------------
DROP TABLE IF EXISTS "apps";
CREATE TABLE "apps" (
  "id" INTEGER NOT NULL,
  "name" TEXT NOT NULL,
  "icon" TEXT,
  "url" TEXT NOT NULL,
  "server_id" INTEGER NOT NULL,
  PRIMARY KEY ("id", "server_id"),
  CONSTRAINT "apps_server_id" FOREIGN KEY ("server_id") REFERENCES "servers" ("id") ON DELETE CASCADE
);

DROP TABLE IF EXISTS "settings";
CREATE TABLE "settings" (
  "name" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  PRIMARY KEY ("name")
);

BEGIN;
INSERT INTO "settings" ("name", "value") VALUES ("time.time_format", '12h');
INSERT INTO "settings" ("name", "value") VALUES ("weather.enabled", 'true');
INSERT INTO "settings" ("name", "value") VALUES ("weather.location.latitude", '43.33728837061606');
INSERT INTO "settings" ("name", "value") VALUES ("weather.location.longitude", '17.81504925295707');
COMMIT;

-- ----------------------------
-- Records of apps
-- ----------------------------
BEGIN;
INSERT INTO "apps" ("id", "name", "icon", "url", "server_id") VALUES (1, 'Plex', 'https://media.sys.truenas.net/apps/plex/icons/icon.png', 'http://192.168.1.10:32400', 1);
COMMIT;

-- ----------------------------
-- Table structure for bookmark_categories
-- ----------------------------
DROP TABLE IF EXISTS "bookmark_categories";
CREATE TABLE "bookmark_categories" (
  "id" INTEGER NOT NULL,
  "name" TEXT NOT NULL,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of bookmark_categories
-- ----------------------------
BEGIN;
INSERT INTO "bookmark_categories" ("id", "name") VALUES (1, 'Dev. Stuff');
INSERT INTO "bookmark_categories" ("id", "name") VALUES (2, 'Courses');
COMMIT;

-- ----------------------------
-- Table structure for bookmarks
-- ----------------------------
DROP TABLE IF EXISTS "bookmarks";
CREATE TABLE "bookmarks" (
  "id" INTEGER NOT NULL,
  "name" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "icon" TEXT,
  "category_id" INTEGER NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "bookmark_bookmark_categories_id" FOREIGN KEY ("category_id") REFERENCES "bookmark_categories" ("id") ON DELETE CASCADE
);

-- ----------------------------
-- Records of bookmarks
-- ----------------------------
BEGIN;
INSERT INTO "bookmarks" ("id", "name", "url", "icon", "category_id") VALUES (1, 'GitHub', 'https://github.com', NULL, 1);
INSERT INTO "bookmarks" ("id", "name", "url", "icon", "category_id") VALUES (2, 'Laracasts', 'https://laracasts.com', 'https://laracasts.com/favicons/favicon-96x96.png', 2);
COMMIT;

-- ----------------------------
-- Table structure for servers
-- ----------------------------
DROP TABLE IF EXISTS "servers";
CREATE TABLE "servers" (
  "id" INTEGER NOT NULL,
  "name" TEXT NOT NULL,
  "host" TEXT NOT NULL,
  "port" INTEGER,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of servers
-- ----------------------------
BEGIN;
INSERT INTO "servers" ("id", "name", "host", "port") VALUES (1, 'Evolia', 'evolia.local', NULL);
INSERT INTO "servers" ("id", "name", "host", "port") VALUES (2, 'Flicker', 'flicker.local', 1234);
COMMIT;

PRAGMA foreign_keys = true;
