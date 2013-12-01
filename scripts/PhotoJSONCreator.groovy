
/**
 * Created with IntelliJ IDEA.
 * User: phpusr
 * Date: 19.02.13
 * Time: 17:49
 * To change this template use File | Settings | File Templates.
 */

import groovy.io.FileType

/**
 * Скрипт для получения json-файла для Фотогалереи
 */

static main(def params) {

    new File('../tmp/photo-list.json').withWriter { out ->
        new File('../tmp/img').eachFileRecurse(FileType.FILES) {
            if(it.name.endsWith('.jpg')) {
                //Путь без имени файла
                def s = it.path.substring(0, it.path.lastIndexOf('\\'))
                println s
                //Папка с файлами
                s = s.substring(s.lastIndexOf('\\')+1)
                println s

                out.writeLine(",{\"img\": \"${it.name}\", \"caption\": \"${s}\"}")
            }
        }
    }

}

