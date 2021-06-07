String choosingResult(_recogResultList) {
  dynamic _recogResult = _recogResultList[0];
  for (var i = 0; i < _recogResultList.length; i++) {
    if (_recogResult["confidence"] < _recogResultList[i]["confidence"]) {
      _recogResult = _recogResultList[i];
    }
  }
  return _recogResult["label"];
}
