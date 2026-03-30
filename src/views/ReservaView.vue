<template>
  <div>
    <!-- Conteudo Reserva -->
    <div class="min-h-screen relative overflow-hidden bg-gray-50 py-4 sm:py-5 lg:py-6">
      <!-- Background decorativo -->
      <div
        class="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-red-500/10 rounded-full blur-3xl animate-none sm:animate-pulse" />
      <div
        class="absolute bottom-0 left-0 w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-black/5 rounded-full blur-3xl animate-none sm:animate-pulse"
        style="animation-delay: 1s"
      />
      <div
        class="absolute top-1/2 left-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-yellow-400/10 rounded-full blur-3xl animate-none sm:animate-pulse"
        style="animation-delay: 2s"
      />

      <div class="relative max-w-6xl mx-auto px-4 py-4 sm:px-6 sm:py-6 md:px-10 lg:px-14 lg:py-10">
        <!-- Header Moderno -->
        <div class="mb-3 sm:mb-2">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-3">
            <!-- Botão Voltar Elegante -->
            <button
              @click="voltarHome"
              class="group inline-flex items-center self-start sm:self-auto px-4 py-2.5 sm:px-4 sm:py-2 mt-0 md:-mt-24 bg-white hover:bg-gray-100 text-gray-700 hover:text-red-600 border-2 border-gray-200 hover:border-red-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium min-h-[44px]"
            >
              <ArrowLeftIcon class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span class="text-sm sm:text-base">Voltar ao Início</span>
            </button>

            <!-- Status Badge -->
            <div
              class="inline-flex items-center self-start sm:self-auto bg-yellow-100 text-yellow-800 px-3.5 py-1.5 sm:px-3 sm:py-1 mt-0 md:-mt-24 rounded-full text-xs sm:text-sm font-semibold border-2 border-yellow-200 whitespace-nowrap"
            >
              Nova Reserva
            </div>
          </div>

          <!-- Título Principal Compacto -->
          <div class="text-center">
            <div
              class="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 mt-0 md:-mt-14 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-lg mb-2"
            >
              <CalendarIcon class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 class="text-2xl sm:text-3xl font-black text-gray-900 mb-1">Nova <span class="text-red-600">Reserva</span></h1>
            <p class="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">Preencha os dados abaixo para agendar sua sala</p>
          </div>
        </div>

        <!-- Formulário Principal -->
        <form
          @submit.prevent="handleSubmit"
          class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          <!-- Header do Formulário -->
          <div
            class="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white px-4 py-3 relative overflow-hidden"
          >
            <div class="absolute inset-0 bg-black/10"></div>
            <div class="relative flex items-center">
              <div class="bg-white/20 p-2 rounded-full mr-3">
                <PlusIcon class="w-4 h-4" />
              </div>
              <div>
                <h2 class="text-lg font-bold">Informações da Reserva</h2>
                <p class="text-red-100 text-xs">Campos com * são obrigatórios</p>
              </div>
            </div>
          </div>

          <div class="p-4 space-y-4">
            <!-- Elementos decorativos -->
            <div class="absolute top-2 right-4 w-16 h-16 bg-white/5 rounded-full"></div>
            <div class="absolute bottom-2 right-12 w-8 h-8 bg-white/10 rounded-full"></div>
          </div>

          <div class="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 md:space-y-10">
            <!-- Seção 1: Informações Pessoais -->
            <div class="space-y-3 sm:space-y-2 mt-0">
              <div class="flex items-center mb-2">
                <div class="bg-red-100 p-2 rounded-full mr-2">
                  <UserIcon class="w-4 h-4 text-red-600" />
                </div>
                <h3 class="text-base font-bold text-gray-900">Informações Pessoais</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <!-- Nome do Responsável -->
                <div class="space-y-1">
                  <label class="block text-sm font-bold text-gray-800 mb-2"> Nome do Responsável * </label>
                  <div class="relative">
                    <input
                      v-model="formData.responsibleName"
                      type="text"
                      required
                      placeholder="Digite seu nome completo"
                      class="w-full px-3 py-3 border-2 border-solid border-gray-600 rounded-2xl focus:border-red-600 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-9"
                    />
                    <UserIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <!-- Título da Reserva -->
                <div class="space-y-1">
                  <label class="block text-sm font-bold text-gray-800 mb-2"> Título da Reserva * </label>
                  <div class="relative">
                    <input
                      v-model="formData.title"
                      type="text"
                      required
                      placeholder="Ex: Reunião de Consumo"
                      class="w-full px-3 py-3 border-2 border-solid border-gray-600 rounded-2xl focus:border-red-600 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-9"
                    />
                    <FileTextIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Seção 2: Local e Data -->
            <div class="space-y-3 mt-2">
              <div class="flex items-center mb-2">
                <div class="bg-black/10 p-2 rounded-full mr-2">
                  <MapPinIcon class="w-4 h-4 text-black" />
                </div>
                <h3 class="text-base font-bold text-gray-900">Local e Data</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <!-- Sala -->
                <div class="space-y-1">
                  <label class="block text-sm font-bold text-gray-800 mb-2"> Selecione a Sala* </label>
                  <div class="relative">
                    <Listbox v-model="formData.rooms">
                      <div class="relative mt-1">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-2xl border-2 border-solid border-gray-600 bg-white py-3 pl-8 pr-8 text-left shadow-md focus:border-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-red-300 sm:text-sm transition-all duration-300"
                        >
                          <span class="flex items-center">
                            <TagIcon class="absolute left-4 w-5 h-5 text-gray-400" />
                            <span class="ml-3 block truncate">{{ selectedRooms }}</span>
                          </span>
                          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              v-for="type in rooms"
                              :key="type"
                              :value="type"
                              v-slot="{ active, selected }"
                            >
                              <li
                                :class="[
                                  active ? 'bg-red-100 text-red-900' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4',
                                ]"
                              >
                                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                                  {{ type }}
                                </span>
                                <span
                                  v-if="selected"
                                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600"
                                >
                                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                              </li>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>
                  </div>
                </div>

                <!-- Data -->
                <div class="space-y-2">
                  <label class="block text-sm font-bold text-gray-800 mb-1"> Data da Reserva * </label>
                  <div class="relative">
                    <input
                      v-model="formData.date"
                      type="date"
                      required
                      :min="minDate"
                      class="w-full px-5 py-3 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-500 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-10"
                    />
                    <CalendarIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Seção 3: Horários -->
            <div class="space-y-6 mt-2">
              <div class="flex items-center mb-5">
                <div class="bg-yellow-100 p-2.5 sm:p-3 rounded-full mr-2">
                  <ClockIcon class="w-4 h-4 text-yellow-600" />
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-gray-900">Horários</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-9">
                <!-- Horário de Início -->
                <div class="space-y-2 mt-0">
                  <label class="block text-sm font-bold text-gray-800 mb-2"> Horário de Início * </label>
                  <div class="relative">
                    <input
                      v-model="formData.start"
                      type="time"
                      required
                      class="w-full px-5 py-3 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-500 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-9"
                    />
                    <ClockIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <!-- Horário de Fim -->
                <div class="space-y-2 mt-0">
                  <label class="block text-sm font-bold text-gray-800 mb-2"> Horário de Fim * </label>
                  <div class="relative">
                    <input
                      v-model="formData.end"
                      type="time"
                      required
                      class="w-full px-5 py-3 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-500 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-9"
                    />
                    <ClockIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Seção 4: Detalhes do Evento -->
            <div class="space-y-6 mt-2 sm:mt-3">
              <div class="flex items-center mb-6">
                <div class="bg-red-100 p-2.5 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <UsersIcon class="w-5 h-5 text-red-600" />
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-gray-900">Detalhes do Evento</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <!-- Tipo de Evento -->
                <div class="space-y-2 mt-0">
                  <label class="block text-sm font-bold text-gray-800 mb-2"> Tipo de Evento/Atividade </label>

                  <div class="relative">
                    <Listbox v-model="formData.eventType">
                      <div class="relative mt-1">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-2xl border-2 border-solid border-gray-500 bg-white py-3 pl-7 pr-10 text-left shadow-md focus:border-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-red-300 sm:text-sm transition-all duration-300"
                        >
                          <span class="flex items-center">
                            <TagIcon class="absolute left-4 w-5 h-5 text-gray-400" />

                            <span class="ml-4 block truncate">{{ selectedEventType }}</span>
                          </span>

                          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              v-for="type in eventTypes"
                              :key="type"
                              :value="type"
                              v-slot="{ active, selected }"
                            >
                              <li
                                :class="[
                                  active ? 'bg-red-100 text-red-900' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4',
                                ]"
                              >
                                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                                  {{ type }}
                                </span>
                                <span
                                  v-if="selected"
                                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600"
                                >
                                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                              </li>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>
                  </div>
                </div>

                <!-- Tipo de Participantes -->
                <div class="space-y-2 mt-0">
                  <label class="block text-sm font-bold text-gray-800 mb-2"> Tipo de Participantes </label>
                  <div class="relative">
                    <Listbox v-model="formData.participants">
                      <div class="relative mt-1">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-2xl border-2 border-solid border-gray-500 bg-white py-3 pl-7 pr-10 text-left shadow-md focus:border-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-red-300 sm:text-sm transition-all duration-300"
                        >
                          <span class="flex items-center">
                            <TagIcon class="absolute left-4 w-5 h-5 text-gray-400" />
                            <span class="ml-4 block truncate">{{ selectedParticipants }}</span>
                          </span>
                          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              v-for="type in participantTypes"
                              :key="type"
                              :value="type"
                              v-slot="{ active, selected }"
                            >
                              <li
                                :class="[
                                  active ? 'bg-red-100 text-red-900' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4',
                                ]"
                              >
                                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                                  {{ type }}
                                </span>
                                <span
                                  v-if="selected"
                                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600"
                                >
                                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                              </li>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>
                  </div>
                </div>

                <!-- Número de Participantes -->
                <div class="space-y-2 mt-0">
                  <label class="block text-sm font-bold text-gray-800 mb-2"> Número de Participantes* </label>
                  <div class="relative">
                    <input
                      v-model="formData.participantCount"
                      type="number"
                      min="1"
                      max="100"
                      placeholder="Ex: 10 pessoas"
                      class="w-full px-5 py-3 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-500 focus:outline-none transition-all duration-300 text-gray-800 font-medium pl-8"
                    />
                    <HashIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <!-- Café -->
                <v-card>
                  <v-card-title class="flex items-center gap-2">
                    <CoffeeIcon class="w-5 h-5 text-red-600" />
                    Serviço de Coffee Break
                  </v-card-title>

                  <v-card-text>
                    <div class="flex items-center space-x-2 -mb-1">
                      <v-checkbox
                        v-model="formData.needsCoffee"
                        label="Solicitar Coffee Break"
                        @change="toggleCoffeeBreak"
                        hide-details
                        color="red"
                      ></v-checkbox>
                      <v-chip v-if="formData.needsCoffee" color="secondary" class="ml-2" size="small">
                        <CoffeeIcon class="w-4 h-4 mr-1" />
                        Solicitado
                      </v-chip>
                    </div>

                    <v-expand-transition>
                      <div
                        v-if="formData.needsCoffee && coffeeBreakExpanded"
                        class="space-y-4 mt-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <!-- <div>
                            <v-text-field v-model="formData.coffeeParticipants" label="Quantidade de Pessoas *"
                              type="number" :required="coffeeBreakRequested" placeholder="Ex: 8"
                              hide-details></v-text-field>
                          </div> -->
                          <div>
                            <v-select
                              v-model="formData.coffee.type"
                              :items="servicosCafe"
                              item-title="text"
                              item-value="value"
                              label="Tipo de Serviço *"
                              :required="formData.needsCoffee"
                              placeholder="Selecione o tipo"
                              hide-details
                            ></v-select>
                          </div>
                        </div>
                        <div>
                          <v-textarea
                            v-model="formData.coffee.observation"
                            label="Observações"
                            placeholder="Ex: sem açúcar, incluir chá, água gelada, restrições alimentares..."
                            hide-details
                          />
                        </div>
                      </div>
                    </v-expand-transition>
                  </v-card-text>
                </v-card>
              </div>
            </div>

            <!-- Observações -->
            <div class="space-y-6 mt-2 sm:mt-3">
              <div class="flex items-center mb-6">
                <div class="bg-yellow-100 p-2.5 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <MessageSquareIcon class="w-5 h-5 text-yellow-600" />
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-gray-900">Observações</h3>
              </div>

              <div class="relative">
                <textarea
                  v-model="formData.notes"
                  rows="4"
                  placeholder="Digite aqui observações, instruções especiais ou requisitos adicionais para a reserva..."
                  class="w-full px-5 sm:px-6 mt-0 py-3 sm:py-4 border-2 border-solid border-gray-500 rounded-2xl focus:border-red-500 focus:outline-none resize-none transition-all duration-300 text-gray-800 font-medium pl-11 sm:pl-12"
                ></textarea>
                <MessageSquareIcon class="absolute left-4 top-6 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <!-- Botões de Ação -->
            <div class="flex flex-col mt-5 sm:flex-row gap-4 sm:gap-6 pt-6 sm:pt-8 border-t-2 border-gray-100">
              <button
                type="button"
                @click="voltarHome"
                class="flex-1 group px-5 py-4 sm:py-5 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300"
              >
                <ArrowLeftIcon class="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300" />
                Cancelar
              </button>

              <button
                type="submit"
                :disabled="!isFormValid || !!conflictMessage"
                :class="`flex-1 group px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-bold transition-all duration-500 flex items-center justify-center shadow-lg hover:shadow-2xl ${
                  !isFormValid || !!conflictMessage
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-200'
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white sm:hover:scale-105 border-2 border-red-600 hover:border-red-700'
                }`"
              >
                <CheckIcon class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                {{ !isFormValid ? "Preencha os campos obrigatórios" : "Confirmar Reserva" }}
              </button>
            </div>
          </div>
          <!-- Modal de Sucesso -->
          <transition name="modal-fade">
            <div
              v-if="showSuccessModal"
              class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <div class="relative w-full max-w-md transform transition-all">
                <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center relative overflow-hidden">
                    <div class="absolute inset-0 bg-white/10 animate-pulse"></div>
                    <div class="relative">
                      <div
                        class="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 animate-bounce"
                      >
                        <CheckIcon class="w-8 h-8 text-green-600" />
                      </div>
                      <h3 class="text-2xl font-bold text-white">Sucesso!</h3>
                    </div>
                  </div>

                  <div class="p-6 text-center">
                    <p class="text-gray-700 text-lg mb-6">Reserva criada com sucesso!</p>
                    <button
                      @click="closeSuccessModal"
                      class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Entendido
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <!-- Modal de Erro -->
          <transition name="modal-fade">
            <div
              v-if="showErrorModal"
              class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <div class="relative w-full max-w-md transform transition-all">
                <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <div class="bg-gradient-to-r from-red-500 to-red-700 p-6 text-center relative overflow-hidden">
                    <div class="absolute inset-0 bg-white/10 animate-pulse"></div>
                    <div class="relative">
                      <div
                        class="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 animate-shake"
                      >
                        <AlertTriangleIcon class="w-8 h-8 text-red-600" />
                      </div>
                      <h3 class="text-2xl font-bold text-white">Atenção!</h3>
                    </div>
                  </div>

                  <div class="p-6 text-center">
                    <p class="text-gray-700 text-lg mb-6">{{ errorMessage }}</p>
                    <button
                      @click="closeErrorModal"
                      class="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Entendido
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <!-- Modal de Conflito -->
          <transition name="modal-fade">
            <div
              v-if="showConflictModal"
              class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <div class="relative w-full max-w-lg transform transition-all">
                <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <div class="bg-gradient-to-r from-orange-500 to-red-600 p-6 relative overflow-hidden">
                    <div class="absolute inset-0 bg-white/10"></div>
                    <div class="relative flex items-center">
                      <div class="bg-white/20 p-3 rounded-full mr-4">
                        <AlertTriangleIcon class="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 class="text-xl font-bold text-white">Conflito de Horário</h3>
                        <p class="text-orange-100 text-sm">Esta sala já está reservada</p>
                      </div>
                    </div>
                  </div>

                  <div class="p-6">
                    <div class="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 mb-6">
                      <p class="text-gray-700 leading-relaxed">{{ conflictMessage }}</p>
                    </div>

                    <button
                      @click="closeConflictModal"
                      class="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Escolher Outro Horário
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <!-- Toast -->
          <transition name="slide-fade">
            <div v-if="showToast" class="fixed top-4 right-4 z-50 max-w-md">
              <div
                class="bg-white rounded-2xl shadow-2xl border-l-4 overflow-hidden"
                :class="toastType === 'success' ? 'border-green-500' : 'border-red-500'"
              >
                <div class="p-4 flex items-center">
                  <div class="flex-shrink-0 mr-3">
                    <div
                      class="w-10 h-10 rounded-full flex items-center justify-center"
                      :class="toastType === 'success' ? 'bg-green-100' : 'bg-red-100'"
                    >
                      <CheckIcon v-if="toastType === 'success'" class="w-5 h-5 text-green-600" />
                      <AlertTriangleIcon v-else class="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-900">{{ toastMessage }}</p>
                  </div>
                  <button @click="closeToast" class="ml-3 text-gray-400 hover:text-gray-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div class="h-1 bg-gray-200">
                  <div
                    class="h-full transition-all duration-3000 ease-linear"
                    :class="toastType === 'success' ? 'bg-green-500' : 'bg-red-500'"
                    :style="{ width: toastProgress + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </transition>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from "vue";
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";

import { useRouter } from "vue-router";
const router = useRouter();
import {
  Coffee as CoffeeIcon,
  Plus as PlusIcon,
  ArrowLeft as ArrowLeftIcon,
  AlertTriangle as AlertTriangleIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  User as UserIcon,
  Users as UsersIcon,
  MapPin as MapPinIcon,
  FileText as FileTextIcon,
  Building as BuildingIcon,
  ChevronDown as ChevronDownIcon,
  Tag as TagIcon,
  Hash as HashIcon,
  MessageSquare as MessageSquareIcon,
  Check as CheckIcon,
} from "lucide-vue-next";

const voltarHome = () => {
  router.push("/");
};

// Estados do formulário
const coffeeBreakRequested = ref(false);
const coffeeBreakExpanded = ref(false);

const emit = defineEmits(["voltar-home", "reserva-criada"]);

const servicosCafe = ref([
  { text: "Café Simples", value: "cafe-simples" },
  { text: "Lanche", value: "lanche" },
  { text: "Completo", value: "completo" },
  { text: "Personalizado", value: "personalizado" },
]);

const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const showConflictModal = ref(false);
const errorMessage = ref("");

// Estados do toast
const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref("success");
const toastProgress = ref(100);
let toastTimer = null;

// Funções dos modais
const closeSuccessModal = () => {
  showSuccessModal.value = false;
  voltarHome();
};

const closeErrorModal = () => {
  showErrorModal.value = false;
};

const closeConflictModal = () => {
  showConflictModal.value = false;
  formData.value.start = "";
  formData.value.end = "";
};

const clearConflict = () => {
  conflictMessage.value = "";
  formData.value.start = "";
  formData.value.end = "";
};

// Função do toast
const showToastNotification = (message, type = "success") => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  toastProgress.value = 100;

  if (toastTimer) clearInterval(toastTimer);

  const duration = 3000;
  const interval = 30;
  const decrement = (interval / duration) * 100;

  toastTimer = setInterval(() => {
    toastProgress.value -= decrement;
    if (toastProgress.value <= 0) {
      closeToast();
    }
  }, interval);
};

const closeToast = () => {
  showToast.value = false;
  if (toastTimer) {
    clearInterval(toastTimer);
    toastTimer = null;
  }
};

// Dados do formulário
const formData = ref({
  responsibleName: "",
  title: "",
  rooms: "",
  date: "",
  start: "",
  end: "",
  eventType: "",
  participants: "",
  participantCount: "",
  notes: "",
  needsCoffee: false,
  coffee: {
    observation: "",
    type: "",
  },
});

// Data mínima (hoje)
const minDate = new Date().toISOString().split("T")[0];

// Lista de salas
const rooms = [
  "Sala Paixão",
  "Respeito",
  "Auditório F1",
  "Auditório F2",
  "Auditório F3",
  "Hoshin",
  "Sala ADM",
  "Sala RH",
  "Sala Manutenção",
  "Sala NIKE",
  "Sala do BIP",
  "Sala Compromisso",
];

// Tipos de evento
const eventTypes = [
  "Reunião de Equipe",
  "Apresentação para Cliente",
  "Apresentação",
  "Treinamento",
  "Reunião - A3",
  "Workshop",
  "Conferência",
  "Entrevista",
  "Sessão de Brainstorm",
  "Review de Projeto",
  "Planning",
  "Retrospectiva",
  "Demo de Produto",
  "Call com Fornecedor/Corporativo",
  "Reunião de Gerentes",
  "Leitura de Livro",
  "Outros",
];

// Tipos de participantes
const participantTypes = [
  "Colaboradores específicos",
  "Auxiliares",
  "Coordenadores",
  "Gerentes",
  "Áreas de Apoio",
  "Colaboradores",
  "Aprendizes",
  "Líderes e Coordenadores",
  "Mecânicos",
  "Processos Seletivos",
  "Visitas",
  "Workshops",
];

// Função para atualizar o colapsável
const toggleCoffeeBreak = () => {
  coffeeBreakExpanded.value = formData.value.needsCoffee;
};

const selectedEventType = computed(() => {
  if (formData.value.eventType) {
    return formData.value.eventType;
  }
  return "Selecione o tipo de evento";
});

const selectedParticipants = computed(() => {
  if (formData.value.participants) {
    return formData.value.participants;
  }
  return "Selecione os participantes";
});

const selectedRooms = computed(() => {
  if (formData.value.rooms) {
    return formData.value.rooms;
  }
  return "Selecione a sala";
});

// Estado de conflito
const conflictMessage = ref("");

// Validação do formulário
const isFormValid = computed(() => {
  return (
    formData.value.responsibleName.trim() !== "" &&
    formData.value.title.trim() !== "" &&
    formData.value.rooms !== "" &&
    formData.value.date !== "" &&
    formData.value.start !== "" &&
    formData.value.end !== "" &&
    formData.value.start < formData.value.end &&
    formData.value.participantCount !== ""
  );
});

// Verificar conflitos de horário
const checkConflicts = () => {
  console.log("Amo agua");

  if (!formData.value.rooms || !formData.value.date || !formData.value.start || !formData.value.end) {
    conflictMessage.value = "";
    return;
  }

  // Simulação de verificação de conflitos - você pode conectar com localStorage aqui
  const existingBookings = JSON.parse(localStorage.getItem("reservas_salas") || "[]");

  const verificaSala = (reserva) => {
    if (reserva.sala === formData.value.rooms) {
      return true;
    }
    return false;
  };
  const verificaData = (reserva) => {
    if (reserva.data === formData.value.date) {
      return true;
    }
    return false;
  };
  const verificaHoraInicio = (reserva) => {
    if (formData.value.start >= reserva.horaInicio && formData.value.start < reserva.horaFinal) {
      return true;
    }
    return false;
  };
  const verificaHoraFinal = (reserva) => {
    if (formData.value.end > reserva.horaInicio && formData.value.end <= reserva.horaFinal) {
      return true;
    }
    return false;
  };

  const conflicts = existingBookings.filter((reserva) => {
    if (verificaSala(reserva)) {
      if (verificaData(reserva)) {
        if (verificaHoraInicio(reserva) || verificaHoraFinal(reserva)) {
          return true;
        }
      }
    }

    return false;
  });

  if (conflicts.length > 0) {
    showConflictModal.value = true;
    const conflict = conflicts[0];
    conflictMessage.value = `A sala "${formData.value.rooms}" já está reservada das ${conflict.horaInicio} às ${conflict.horaFinal} para "${conflict.tipoevento}"`;
    formData.value.start = "";
    formData.value.end = "";
  } else {
    conflictMessage.value = "";
  }
};

// Watch para verificar conflitos
watch(
  [() => formData.value.rooms, () => formData.value.date, () => formData.value.start, () => formData.value.end],
  () => {
    checkConflicts();
  },
);

// Submissão do formulário
const handleSubmit = () => {
  if (!isFormValid.value || conflictMessage.value) {
    errorMessage.value = "Por favor, preencha todos os campos obrigatórios corretamente.";
    showErrorModal.value = true;
    return;
  }

  if (!formData.value.participantCount || formData.value.participantCount <= 0) {
    errorMessage.value = "O número de participantes deve ser maior que zero!";
    showErrorModal.value = true;
    return;
  }

  const reservaData = {
    id: Date.now(),
    sala: formData.value.rooms,
    responsavel: formData.value.responsibleName,
    tipoevento: formData.value.eventType || "",
    data: formData.value.date,
    horaInicio: formData.value.start,
    horaFinal: formData.value.end,
    participantes: formData.value.participants || "",
    quantidade: formData.value.participantCount,
    observacoes: formData.value.notes,
    cafe: formData.value.needsCoffee,
    cafeDetalhes: formData.value.needsCoffee ? formData.value.coffee : {},
    ...(formData.value.needsCoffee && { coffeeStatus: "solicitado" }),
  };

  // Salvar no localStorage
  const reservasExistentes = JSON.parse(localStorage.getItem("reservas_salas") || "[]");
  reservasExistentes.push(reservaData);
  localStorage.setItem("reservas_salas", JSON.stringify(reservasExistentes));

  showSuccessModal.value = true;

  formData.value = {
    responsibleName: "",
    title: "",
    rooms: "",
    date: "",
    start: "",
    end: "",
    eventType: "",
    participants: "",
    participantCount: "",
    notes: "",
    needsCoffee: false,
    coffee: {
      observation: "",
      type: "",
    },
  };

  // Emitir eventos
  window.dispatchEvent(new CustomEvent("reserva-adicionada"));
  emit("reserva-criada", reservaData);
};
</script>

<style scoped>
/* Animações customizadas */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Efeitos de hover personalizados */
.hover-lift:hover {
  transform: translateY(-2px);
}

/* Estilização dos inputs */
input:focus,
select:focus,
textarea:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px -2px rgba(239, 68, 68, 0.2);
}

/* Animação dos ícones */
.icon-bounce:hover {
  animation: bounce 0.5s ease-in-out;
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    transform: translate3d(0, -8px, 0);
  }

  70% {
    transform: translate3d(0, -4px, 0);
  }

  90% {
    transform: translate3d(0, -2px, 0);
  }
}

/* Personalização dos radio buttons */
input[type="radio"]:checked {
  background-color: #dc2626;
  border-color: #dc2626;
}

/* Gradiente no botão principal */
.gradient-button {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
}

.gradient-button:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
}

/* Responsividade adicional */
@media (max-height: 800px) {
  .min-h-screen {
    min-height: auto;
  }
}

/* Animações dos modais */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active .bg-white,
.modal-fade-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .bg-white,
.modal-fade-leave-to .bg-white {
  transform: scale(0.9) translateY(20px);
}

/* Animações do toast */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Animação de shake */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>
