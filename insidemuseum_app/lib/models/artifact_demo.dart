import 'dart:convert';

import 'package:http/http.dart' as http;

class ArtifactDemo {
  final String itemKey;
  final String museum;
  final String title;
  final String imageBase64;
  ArtifactDemo({this.itemKey, this.museum, this.title, this.imageBase64});

  factory ArtifactDemo.fromJson(Map<String, dynamic> json) {
    return ArtifactDemo(
      itemKey: json['organization_item_key'],
      museum: json['organization_path_name'],
      title: json['title'],
      imageBase64: json['image_files'],
    );
  }
}

Future<List<ArtifactDemo>> fetchArtifactDemo(String page) async {
  final response = await http
      .get(Uri.http('192.168.56.196:3000', '/kyohaku/ja/page/' + page));
  if (response.statusCode == 200) {
    List jsonResponse = json.decode(response.body);
    return jsonResponse.map((data) => new ArtifactDemo.fromJson(data)).toList();
  } else {
    throw Exception('Unexpected error occured!');
  }
}

Future<List<ArtifactDemo>> fetchSearch(String searchKeyword) async {
  final response = await http.get(
      Uri.http('192.168.56.196:3000', '/kyohaku/ja/search/' + searchKeyword));
  if (response.statusCode == 200) {
    List jsonResponse = json.decode(response.body);
    return jsonResponse.map((data) => new ArtifactDemo.fromJson(data)).toList();
  } else {
    throw Exception('Unexpected error occured!');
  }
}
