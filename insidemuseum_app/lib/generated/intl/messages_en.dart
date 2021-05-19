// DO NOT EDIT. This is code generated via package:intl/generate_localized.dart
// This is a library that provides messages for a en locale. All the
// messages from the main program should be duplicated here with the same
// function name.

// Ignore issues from commonly used lints in this file.
// ignore_for_file:unnecessary_brace_in_string_interps, unnecessary_new
// ignore_for_file:prefer_single_quotes,comment_references, directives_ordering
// ignore_for_file:annotate_overrides,prefer_generic_function_type_aliases
// ignore_for_file:unused_import, file_names

import 'package:intl/intl.dart';
import 'package:intl/message_lookup_by_library.dart';

final messages = new MessageLookup();

typedef String MessageIfAbsent(String messageStr, List<dynamic> args);

class MessageLookup extends MessageLookupByLibrary {
  String get localeName => 'en';

  final messages = _notInlinedMessages(_notInlinedMessages);
  static _notInlinedMessages(_) => <String, Function> {
    "choosingMuseum" : MessageLookupByLibrary.simpleMessage("The museum you want to see is:"),
    "confirmArtifact" : MessageLookupByLibrary.simpleMessage("Are you looking for: "),
    "confirmFalse" : MessageLookupByLibrary.simpleMessage("No"),
    "confirmTrue" : MessageLookupByLibrary.simpleMessage("Yes"),
    "museumName1" : MessageLookupByLibrary.simpleMessage("Tokyo National Museum"),
    "museumName2" : MessageLookupByLibrary.simpleMessage("Kyoto National Museum"),
    "museumName3" : MessageLookupByLibrary.simpleMessage("Nara National Museum"),
    "museumName4" : MessageLookupByLibrary.simpleMessage("Kyushu National Museum"),
    "recognitionTitle" : MessageLookupByLibrary.simpleMessage("Recognition"),
    "stayScreenAlert" : MessageLookupByLibrary.simpleMessage("Please stay on the screen for "),
    "stayScreenAlert2" : MessageLookupByLibrary.simpleMessage(" seconds")
  };
}
