import 'dart:async';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:insidemuseum_app/pages/result_screen.dart';
import 'package:insidemuseum_app/pages/home_screen.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'generated/l10n.dart';

List<CameraDescription> cameras;

Future<void> main() async {
  // Ensure that plugin services are initialized so that `availableCameras()`
  // can be called before `runApp()`
  WidgetsFlutterBinding.ensureInitialized();

  // Obtain a list of the available cameras on the device.
  final cameras = await availableCameras();

  // Get a specific camera from the list of available cameras.

  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    title: 'Inside Museum',
    localizationsDelegates: [
      S.delegate,
      GlobalMaterialLocalizations.delegate,
      GlobalWidgetsLocalizations.delegate,
      GlobalCupertinoLocalizations.delegate,
    ],
    supportedLocales: S.delegate.supportedLocales,
    theme: ThemeData(
      brightness: Brightness.light,
    ),
    home: HomePage(cameras, null),
    routes: {
      '/home': (context) => HomePage(cameras, null),
      '/result': (context) => ResultScreen(),
    },
  ));
}
