"use client";

import React, { useState } from "react";
import Header from "../(components)/Navbar/Header";

type UserSetting = {
    label: string;
    value: string | boolean;
    type: "text" | "toggle";
};

// 默认设置
const mockSettings: UserSetting[] = [
  { label: "Username", value: "john_doe", type: "text" },
  { label: "Email", value: "john.doe@example.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },

];

const Settings = () => {
    const [userSettings, setUserSettings] =useState<UserSetting[]>(mockSettings);

    const handleToggleChange = (index:number) => {
        const settingCopy = [...userSettings];
        settingCopy[index].value = !settingCopy[index].value as boolean; // 使用 as boolean 让 TypeScript 确保 value 是 boolean 如果不是boolean 不用管
        setUserSettings(settingCopy);
    }
  return (
    <div className="w-full shadow-[0_0_20px_5px_rgba(64,44,36,0.9)] rounded-2xl p-3">
      <Header name="User Settings" />
      <hr className="text-white mt-2"/>
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-[#212121] rounded-lg">
          <thead className="bg-[#212121] text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Setting
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4 text-white">{setting.label}</td>
                <td className="py-2 px-4">
                  {setting.type === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"
                      ></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-gray-100 focus:outline-none focus:border-blue-500"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Settings