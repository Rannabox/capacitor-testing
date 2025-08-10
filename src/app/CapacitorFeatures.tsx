"use client";
import { useState } from "react";
import { CameraResultType } from "@capacitor/camera";

export default function CapacitorFeatures() {
  const [cameraResult, setCameraResult] = useState<string>("");
  const [geoResult, setGeoResult] = useState<string>("");
  const [pushResult, setPushResult] = useState<string>("");

  async function testCamera() {
    try {
      const { Camera } = await import("@capacitor/camera");
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      setCameraResult(photo.base64String ? "Photo captured!" : "No photo");
    } catch (err) {
      setCameraResult("Camera error: " + err);
    }
  }

  async function testGeolocation() {
    try {
      const { Geolocation } = await import("@capacitor/geolocation");
      //permission check is handled by Capacitor
     
      const pos = await Geolocation.getCurrentPosition();
      setGeoResult(`Lat: ${pos.coords.latitude}, Lng: ${pos.coords.longitude}`);
    } catch (err) {
      setGeoResult("Geolocation error: " + err);
    }
  }

async function testPush() {
  try {
    const { LocalNotifications } = await import("@capacitor/local-notifications");
    await LocalNotifications.requestPermissions();

    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Test Notification",
          body: "This is a local notification!",
          id: 1,
          schedule: { at: new Date(Date.now() + 1000) }, // 1 second later
        },
      ],
    });

    setPushResult("Local notification scheduled!");
  } catch (err) {
    setPushResult("Local notification error: " + err);
  }
}

  return (
    <div className="flex flex-col gap-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={testCamera}>Test Camera</button>
      <div>{cameraResult}</div>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={testGeolocation}>Test Geolocation</button>
      <div>{geoResult}</div>
      <button className="bg-purple-500 text-white px-4 py-2 rounded" onClick={testPush}>Test Push Notification</button>
      <div>{pushResult}</div>
    </div>
  );
}
