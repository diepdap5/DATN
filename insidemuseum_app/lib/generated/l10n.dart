// GENERATED CODE - DO NOT MODIFY BY HAND
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'intl/messages_all.dart';

// **************************************************************************
// Generator: Flutter Intl IDE plugin
// Made by Localizely
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, lines_longer_than_80_chars
// ignore_for_file: join_return_with_assignment, prefer_final_in_for_each
// ignore_for_file: avoid_redundant_argument_values

class S {
  S();
  
  static S current;
  
  static const AppLocalizationDelegate delegate =
    AppLocalizationDelegate();

  static Future<S> load(Locale locale) {
    final name = (locale.countryCode?.isEmpty ?? false) ? locale.languageCode : locale.toString();
    final localeName = Intl.canonicalizedLocale(name); 
    return initializeMessages(localeName).then((_) {
      Intl.defaultLocale = localeName;
      S.current = S();
      
      return S.current;
    });
  } 

  static S of(BuildContext context) {
    return Localizations.of<S>(context, S);
  }

  /// `The museum you want to see is:`
  String get choosingMuseum {
    return Intl.message(
      'The museum you want to see is:',
      name: 'choosingMuseum',
      desc: '',
      args: [],
    );
  }

  /// `Tokyo National Museum`
  String get museumName1 {
    return Intl.message(
      'Tokyo National Museum',
      name: 'museumName1',
      desc: '',
      args: [],
    );
  }

  /// `Kyoto National Museum`
  String get museumName2 {
    return Intl.message(
      'Kyoto National Museum',
      name: 'museumName2',
      desc: '',
      args: [],
    );
  }

  /// `Nara National Museum`
  String get museumName3 {
    return Intl.message(
      'Nara National Museum',
      name: 'museumName3',
      desc: '',
      args: [],
    );
  }

  /// `Kyushu National Museum`
  String get museumName4 {
    return Intl.message(
      'Kyushu National Museum',
      name: 'museumName4',
      desc: '',
      args: [],
    );
  }

  /// `Recognition`
  String get recognitionTitle {
    return Intl.message(
      'Recognition',
      name: 'recognitionTitle',
      desc: '',
      args: [],
    );
  }

  /// `Are you looking for: `
  String get confirmArtifact {
    return Intl.message(
      'Are you looking for: ',
      name: 'confirmArtifact',
      desc: '',
      args: [],
    );
  }

  /// `Yes`
  String get confirmTrue {
    return Intl.message(
      'Yes',
      name: 'confirmTrue',
      desc: '',
      args: [],
    );
  }

  /// `No`
  String get confirmFalse {
    return Intl.message(
      'No',
      name: 'confirmFalse',
      desc: '',
      args: [],
    );
  }

  /// `Please stay on the screen for `
  String get stayScreenAlert {
    return Intl.message(
      'Please stay on the screen for ',
      name: 'stayScreenAlert',
      desc: '',
      args: [],
    );
  }

  /// ` seconds`
  String get stayScreenAlert2 {
    return Intl.message(
      ' seconds',
      name: 'stayScreenAlert2',
      desc: '',
      args: [],
    );
  }

  /// `Search...`
  String get searchPlaceholder {
    return Intl.message(
      'Search...',
      name: 'searchPlaceholder',
      desc: '',
      args: [],
    );
  }
}

class AppLocalizationDelegate extends LocalizationsDelegate<S> {
  const AppLocalizationDelegate();

  List<Locale> get supportedLocales {
    return const <Locale>[
      Locale.fromSubtags(languageCode: 'en'),
      Locale.fromSubtags(languageCode: 'ja'),
    ];
  }

  @override
  bool isSupported(Locale locale) => _isSupported(locale);
  @override
  Future<S> load(Locale locale) => S.load(locale);
  @override
  bool shouldReload(AppLocalizationDelegate old) => false;

  bool _isSupported(Locale locale) {
    if (locale != null) {
      for (var supportedLocale in supportedLocales) {
        if (supportedLocale.languageCode == locale.languageCode) {
          return true;
        }
      }
    }
    return false;
  }
}