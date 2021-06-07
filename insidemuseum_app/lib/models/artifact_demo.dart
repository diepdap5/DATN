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
