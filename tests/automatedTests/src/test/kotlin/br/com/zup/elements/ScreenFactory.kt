package br.com.zup.screens

import br.com.zup.screens.angular.AngularImageScreen
import br.com.zup.screens.react.ReactImageScreen
import org.openqa.selenium.WebDriver

class ScreenFactory(
        val platform: Platform,
        private val driver: WebDriver
) {

    enum class Platform {
        react,
        angular;
    }

    fun getImageScreen(): ImageScreen {
        when(platform) {
            Platform.react -> return ReactImageScreen(driver)
            Platform.angular -> return AngularImageScreen(driver)
        }
    }

    fun getButtonScreen(): ButtonScreen {
        when(platform) {
            Platform.react -> return ReactButtonScreen(driver)
            Platform.angular -> return AngularButtonScreen(driver)
        }
    }

    fun getListViewScreen(): ListViewScreen {
        when(platform) {
            Platform.react -> return ReactListViewScreen(driver)
            Platform.angular -> return AngularListViewScreen(driver)
        }
    }

    fun getPageViewScreen(): PageViewScreen {
        when(platform) {
            Platform.react -> return ReactPageViewScreen(driver)
            Platform.angular -> return AngularPageViewScreen(driver)
        }
    }

    fun getTabViewScreen(): TabViewScreen {
        when(platform) {
            Platform.react -> return ReactTabViewScreen(driver)
            Platform.angular -> return AngularTabViewScreen(driver)
        }
    }

    fun getTouchableScreen(): TouchableScreen {
        when(platform) {
            Platform.react -> return ReactTouchableScreen(driver)
            Platform.angular -> return AngularTouchableScreen(driver)
        }
    }
}